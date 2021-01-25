<template>
  <div>
    <el-table :data="getGoods" stripe border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <div>
            <img width="100px" :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="success" size="small" plain>启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="warning"
              size="small"
              @click="getOne(scope.row.id)"
              round
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row.id)"
              round
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="getSize"
      background
      layout="prev, pager, next"
      :total="getTotal"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delGoods } from "@/utils/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsAction();
    this.getGoodsCountAction();
  },
  computed: {
    ...mapGetters({
      getGoods: "goods/getGoods",
      getTotal: "goods/getTotal",
      getSize: "goods/getSize",
      getPage: "goods.getPage",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getGoodsCountAction: "goods/getGoodsCountAction",
      changePageAction: "goods/changePageAction",
    }),
    // 获取一条数据
    getOne(id) {
      this.$emit("getOne", id);
    },
    // 切换页码
    changePage(page) {
      // console.log(page);
      this.changePageAction(page);
    },
    // 删除
    async del(id) {
      const res = await delGoods(id).catch((err) => console.log(er));
      if (res.data.code == 200) {
        this.$message.success(res.data.msg);
        // 重新获取列表
        this.getGoodsAction();
        // 重新获取总数
        this.getGoodsCountAction();
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang='' scoped>
</style>