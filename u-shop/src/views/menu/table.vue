// *表格
<template>
  <el-table
    row-key="id"
    :tree-props="{ children: 'children' }"
    :data="menu"
    border
    stripe
    style="width: 100%"
  >
    <el-table-column prop="id" label="菜单编号" width="180"> </el-table-column>
    <el-table-column prop="title" label="菜单名称" width="180">
    </el-table-column>
    <el-table-column prop="pid" label="上级菜单"> </el-table-column>
    <el-table-column prop="icon" label="菜单图标"> </el-table-column>
    <el-table-column prop="url" label="菜单地址"> </el-table-column>
    <el-table-column prop="status" label="状态"> </el-table-column>
    <el-table-column prop="" label="操作">
      <!-- 需要开一个槽口，然后可以取值 -->
      <template slot-scope="scope">
        <div>
          <el-button
            type="warning"
            size="small"
            @click="getInfo(scope.row.id)"
            round
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
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
import { mapActions, mapGetters } from "vuex";
// 导入删除接口，根据id获取，接口
import { delMenu, getById, editInfo } from "./../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menu: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenu: "menu/getMenuAction",
    }),
    // 删除
    async del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delMenu(id).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            // 删除后更新表格
            this.getMenu();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    async getInfo(id) {
      // 查找需要编辑的条目
      const res = await getById(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$emit("getInfo", res.data.list, id);
      }
    },
    async edit(info) {
      console.log(info);
    },
  },
  mounted() {
    this.getMenu();
  },
};
</script>

<style lang='' scoped>
</style>