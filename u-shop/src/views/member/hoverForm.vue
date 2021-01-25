<template>
  <div>
    <el-dialog
      title="修改会员"
      :visible.sync="inState.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
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
        <el-button type="primary" @click="edit('form')"> 修改 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMemberInfo, editMember } from "@/utils/axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      // 验证
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      getMemberAction: "member/getMemberAction",
    }),
    cancel() {
      this.inState.isShow = false;
    },
    reset() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
      this.$refs.form.resetFields();
      this.inState.isShow = false;
    },
    // 获取一条数据
    async getOne(uid) {
      const res = await getMemberInfo(uid).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.form = res.data.list;
        this.form.uid = uid;
        this.inState.isShow = true;
      }
    },
    // 编辑
    async edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await editMember(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取列表
            this.getMemberAction();
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

<style lang='' scoped>
</style>