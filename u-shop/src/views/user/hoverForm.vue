<template>
  <el-dialog
    :title="inState.mode == 'add' ? '添加管理员' : '修改管理员'"
    :visible.sync="inState.isShow"
    :before-close="cancel"
    center
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="所属角色"
        prop="roleid"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option
            v-for="item in getRoles"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="username"
        label="用户名称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
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
      <el-button v-if="inState.mode == 'add'" type="primary" @click="add('form')">
        确 定
      </el-button>
      <el-button v-else type="primary" @click="edit('form')"> 修改 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addUser,editUser } from "@/utils/axios";
export default {
  mounted() {
    this.getRolesAction();
    this.getUserAction();
  },
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      // 验证
      rules: {
        roleid: [
          { required: true, message: "请选择角色名称", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getRoles: "role/getRoles",
    }),
  },
  methods: {
    ...mapActions({
      getRolesAction: "role/getRolesAction",
      getUserAction: "user/getUserAction",
      getTotalAction: "user/getTotalAction",
    }),
    reset() {
      this.form = {
        uid: "",
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await editUser(this.form).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.inState.isShow = false;
            this.$message.success(res.data.msg);
            // 获取用户列表
            this.getUserAction();
            // 获取总条数
            this.getTotalAction();
            this.reset();
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加角色
    async add(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await addUser(this.form).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.inState.isShow = false;
            this.$message.success(res.data.msg);
            // 获取用户列表
            this.getUserAction();
            // 获取总条数
            this.getTotalAction();
            this.reset();
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

<style lang='less' scoped>
</style>