<template>
  <div>
    <el-table :data="getUser" stripe border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="warning"
              size="small"
              @click="getUserByUid(scope.row.uid)"
              round
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row.uid)"
              round
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="getSize"
      layout="prev, pager, next"
      :total="getTotal"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { userCount, deleteUser, getUserInfo } from "@/utils/axios";
export default {
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    this.getUserAction(); // 获取管理员列表
    this.getTotalAction(); // 获取总条数
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getSize: "user/getSize",
      getPage: "user/getPage",
      getTotal: "user/getTotal",
    }),
  },
  methods: {
    ...mapActions({
      getUserAction: "user/getUserAction",
      getTotalAction: "user/getTotalAction",
      changePageAction: "user/changePageAction",
    }),
    // 更改页码
    changePage(page) {
      this.changePageAction(page);
    },
    // 获取一条数据
    async getUserByUid(uid) {
      const res = await getUserInfo(uid).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$emit("edit", res.data.list);
      }
    },
    // 删除
    async del(uid) {
      const res = await deleteUser(uid).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        // 重新获取用户列表
        this.getUserAction();
        // 重新获取页数
        this.getTotalAction();
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang='' scoped>
</style>