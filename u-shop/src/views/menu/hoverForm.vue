// *悬浮菜单
<template>
  <el-dialog
    :title="inState.mode == 'add' ? '添加菜单' : '编辑菜单'"
    :center="true"
    :visible.sync="inState.isShow"
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="菜单名称" prop="title" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menu"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" :label-width="formLabelWidth">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item
        v-if="form.type == 1"
        label="菜单图标"
        :label-width="formLabelWidth"
        prop="icon"
      >
        <el-select v-model="form.icon" placeholder="请选择图标">
          <el-option
            v-for="item in iconList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-else
        label="菜单地址"
        prop="url"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.url" placeholder="请选择地址">
          <el-option
            v-for="item in indexRouter"
            :key="item.path"
            :label="item.name"
            :value="item.path"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-tooltip
          :content="form.status === 1 ? '正常' : '禁用'"
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
        type="primary"
        v-if="inState.mode == 'add'"
        @click="add('form')"
        >确 定</el-button
      >
      <el-button type="primary" v-else @click="edit('form')">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 添加数据
import { addMenu,editInfo } from "./../../utils/axios";
import { indexRouter } from "./../../router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 表单对象
      form: {
        pid: 0, // 上级分类编号
        title: "", // 标题
        icon: "", // 图标
        type: 1, // 类型1目录2菜单
        url: "", // 菜单地址
        status: 1, // 状态1正常2禁用
      },
      iconList: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-goods",
        "el-icon-s-home",
      ],
      // 路由下拉菜单数据
      indexRouter,
      // 表单验证
      // ! 使用 elementUI 的表单验证需要 prop属性匹配
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择菜单", trigger: "change" }],
      },
      formLabelWidth: "120px",
      editId:null
    };
  },
  computed: {
    ...mapGetters({
      menu: "menu/getMenuList",
    }),
  },
  props: ["inState"],
  methods: {
    // 重置表单项
    reset() {
      this.form = {
        pid: 0, // 上级分类编号
        title: "", // 标题
        icon: "", // 图标
        type: 1, // 类型1目录2菜单
        url: "", // 菜单地址
        status: 1, // 状态1正常2禁用
      };
      this.$refs.form.resetFields();
    },
    // 隐藏表单
    cancel() {
      this.reset();
      this.$emit("cancel");
    },
    // 添加数据
    add(formName) {
      this.inState.mode = "add";
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await addMenu(this.form).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 隐藏表单
            this.cancel();
            this.getMenu();
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑
    edit(formName) {
      this.form.id = this.editId;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await editInfo(this.form).catch((err) => console.log(err));
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 隐藏表单
            this.cancel();
            this.getMenu();
          } else {
            console.log(res);
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ...mapActions({
      getMenu: "menu/getMenuAction", // 获取表
    }),
  },
};
</script>

<style lang='' scoped>
</style>