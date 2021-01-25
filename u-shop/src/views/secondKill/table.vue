<template>
  <div>
    <el-table
      :data="getSecondKill"
      stripe
      border
      row-key="id"
      style="width: 100%"
    >
      <el-table-column prop="title" label="活动名称" width="180">
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
import { mapGetters, mapActions } from "vuex";
import { delSecondKill } from "@/utils/axios";
export default {
  computed: {
    ...mapGetters({
      getSecondKill: "secondKill/getSecondKill",
    }),
  },
  mounted() {
    this.getSecondKillAction();
  },
  methods: {
    ...mapActions({
      getSecondKillAction: "secondKill/getSecondKillAction",
    }),
    getOne(id) {
      this.$emit("getOne", id);
    },
    // 删除
    async del(id) {
      const res = await delSecondKill(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        // 重新获取列表
        this.getSecondKillAction();
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang='' scoped>
</style>