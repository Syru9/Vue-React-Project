<template>
  <div>
    <el-table :data="getSpecs" stripe border row-key="id" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item">{{
              item
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
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
              @click="del(scope.row.id)"
              size="small"
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
import { mapGetters, mapActions } from "vuex";
import { delSpecs } from "@/utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // 获取规格列表并渲染
      getSpecs: "specs/getSpecs",
      getTotal: "specs/getTotal",
      getSize: "specs/getSize",
    }),
  },
  mounted() {
    // 调用查询接口，用 getter 获取值
    this.getSpecsAction();
    this.getSpecsCountAction();
  },
  methods: {
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCountAction: "specs/getSpecsCountAction",
      changePageAction: "specs/changePageAction",
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
      // console.log(id);
      const res = await delSpecs(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        // 重新获取列表
        this.getSpecsAction();
        // 重新获取数量
        this.getSpecsCountAction();
      } else {
        this.$message.success(res.data.msg);
      }
    },
  },
};
</script>

<style lang='' scoped>
.el-tag {
  margin: 2px;
}
</style>