<template>
  <div>
    <el-table :data="getBanner" stripe border row-key="id" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <div>
            <img width="100px" :src="$imgUrl + scope.row.img" alt="" />
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
            <el-button type="warning" size="small" @click="getOne(scope.row.id)" round>编辑</el-button>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delBanner } from "@/utils/axios";
export default {
  computed: {
    ...mapGetters({
      getBanner: "banner/getBanner",
    }),
  },
  mounted() {
    this.getBannerAction();
  },
  methods: {
    // 获取轮播图列表
    ...mapActions({
      getBannerAction: "banner/getBannerAction",
    }),
    // 删除
    async del(id) {
      console.log(id);
      const res = await delBanner(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        // 重新获取 banner 列表
        this.getBannerAction();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取一个 banner
    getOne(id){
      this.$emit('getOne',id);
    }
  },
};
</script>

<style lang='' scoped>
</style>