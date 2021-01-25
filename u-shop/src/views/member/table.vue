<template>
  <div>
    <el-table :data="getMember" stripe border row-key="id" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
              @click="getOne(scope.row.uid)"
              round
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getMember: "member/getMember",
    }),
  },
  mounted() {
    this.getMemberAction();
  },
  methods: {
    ...mapActions({
      getMemberAction: "member/getMemberAction",
    }),
    // 获取一条
    getOne(uid) {
      this.$emit("getOne", uid);
    },
  },
};
</script>

<style lang='' scoped>
</style>