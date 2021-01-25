<template>
  <el-dialog
    :title="inState.mode == 'add' ? '添加角色' : '修改角色'"
    :visible.sync="inState.isShow"
    :before-close="cancel"
    center
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="角色名称"
        prop="rolename"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="角色权限"
        v-model="form.menus"
        :label-width="formLabelWidth"
      >
        <el-tree
          :data="getMenuList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          check-on-click-node
          check-strictly
          :expand-on-click-node="false"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-tooltip
          :content="form.status == 1 ? '启用' : '禁用'"
          placement="right"
        >
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button
        v-if="inState.mode == 'add'"
        type="primary"
        @click="add('form')"
      >
        确 定
      </el-button>
      <el-button v-else type="primary" @click="edit('form')"> 修改 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, getRoleInfo, editRole } from "@/utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      // 验证
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getMenu();
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenu: "menu/getMenuAction",
      getRolesAction: "role/getRolesAction",
    }),
    // 重置
    reset() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 将树状结构重置
      this.$refs.tree.setCheckedKeys([]);
      // 重置验证
      this.$refs.form.resetFields();
    },
    // 关闭
    cancel() {
      this.inState.isShow = false;
      this.reset();
    },
    // 编辑角色
    edit(formName) {
      this.inState.isShow = false;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          const res = await editRole(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.inState.isShow = false;
            this.reset();
            // 重新获取角色列表
            this.getRolesAction();
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取一条数据
    async getOne(e) {
      console.log(e);
      const res = await getRoleInfo(e).catch((err) => console.log(err));
      console.log(res);
      if (res.data.code === 200) {
        this.form = res.data.list;
        // 将id赋给查询的结果上，便于接下来的修改操作
        this.form.id = e;
        // 给树状结构附上值
        this.$refs.tree.setCheckedKeys(res.data.list.menus.split(","));
      }
    },
    // 添加角色
    add(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          const res = await addRole(this.form).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.inState.isShow = false;
            this.reset();
            // 重新获取角色列表
            this.getRolesAction();
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  props: ["inState"],
};
</script>

<style lang='' scoped>
</style>