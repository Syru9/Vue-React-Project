<template>
  <el-table :data="getRoles" border stripe style="width: 100%">
    <el-table-column prop="id" label="角色编号" width="180"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180">
    </el-table-column>
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
            @click="edit(scope.row.id)"
            round
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="del(scope.row.id)"
            size="small"
            round
          >
            删除
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteRole } from "@/utils/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getRolesAction();
  },
  computed: {
    ...mapGetters({
      getRoles: "role/getRoles",
    }),
  },
  methods: {
    // 编辑
    edit(e) {
      this.$emit("edit", e);
    },
    // 删除
    async del(e) {
      const res = await deleteRole(e).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        // 重新获取用户列表
        this.getRolesAction();
      } else {
        this.$message.errpr(res.data.msg);
      }
    },
    // 获取角色列表
    ...mapActions({
      getRolesAction: "role/getRolesAction",
    }),
  },
};
</script>

<style lang='' scoped>
</style>