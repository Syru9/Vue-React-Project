<template>
  <div>
    <el-dialog
      :title="inState.mode == 'add' ? '添加商品规格' : '修改商品规格'"
      :visible.sync="inState.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="规格名称"
          prop="specsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 制作新增规格属性 -->
        <el-form-item
          v-for="(item, index) in attrsTemp"
          label="规格属性"
          :label-width="formLabelWidth"
          :key="index"
          :prop="item.value"
        >
          <el-input style="width: 78%" v-model="item.value"> </el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click.prevent="removeAttr(index)"
            >删除</el-button
          >
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
        <el-button v-else type="primary" @click="edit('form')">
          修改
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSpecs, getSpecsInfo, editSpecs } from "@/utils/axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        specsname: "",
        attrs: [
          {
            value: "",
          },
        ],
        status: 1,
      },
      attrsTemp: [
        {
          value: "",
        },
      ],
      // 验证
      rules: {
        specsname: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCountAction: "specs/getSpecsCountAction",
    }),
    // 重置
    reset() {
      this.form = {
        specsname: "",
        attrs: [
          {
            value: "",
          },
        ],
        status: 1,
      };
      this.attrsTemp = [
        {
          value: "",
        },
      ];
      // 重置验证
      this.$refs.form.resetFields();
    },
    // 取消
    cancel() {
      this.inState.isShow = false;
      this.reset();
    },
    // 获取一条数据
    async getOne(id) {
      const res = await getSpecsInfo(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        console.log(res);
        this.form = res.data.list[0];
        this.form.id = id;
        this.attrsTemp = res.data.list[0].attrs.map((value) => {
          return { value };
        });
      }
    },
    // 修改数据
    edit(formName) {
      // 转换赋值
      this.form.attrs = this.attrsTemp.map((item) => item.value).join(",");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await editSpecs(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取规格列表
            this.getSpecsAction();
            // 重新获取总数
            this.getSpecsCountAction();
            this.inState.isShow = false;
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
    // 添加规格属性
    addAttr() {
      this.attrsTemp.push({ value: "" });
    },
    // 移除规格属性
    removeAttr(index) {
      // console.log(index);
      this.attrsTemp.splice(index, 1);
    },
    add(formName) {
      // 转换赋值
      this.form.attrs = this.attrsTemp.map((item) => item.value).join(",");
      // console.log(this.form);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await addSpecs(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取规格列表
            this.getSpecsAction();
            // 重新获取总数
            this.getSpecsCountAction();
            this.inState.isShow = false;
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