<template>
  <el-dialog
    :title="inState.mode == 'add' ? '添加商品分类' : '修改商品分类'"
    :visible.sync="inState.isShow"
    :before-close="cancel"
    center
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="上级分类" prop="pid" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择上级分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in getClassifyList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="catename"
        label="分类名称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      
      <!-- 图片上传 -->
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="onChange"
          :auto-upload="false"
          :limit="1"
          :on-exceed="onExceed"
          :file-list="fileList"
          ref="upload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
import { mapGetters, mapActions } from "vuex";
import { addClassify, editClassify } from "@/utils/axios";
export default {
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      // 预览图片地址
      dialogImageUrl: "",
      // 文件列表
      fileList: [],
      // 校验
      rules: {
        pid: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      // 提出图片的信息属性
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      getClassifyList: "classify/getClassifyList",
    }),
  },
  methods: {
    ...mapActions({
      getClassifyAction: "classify/getClassifyAction",
    }),
    // 重置
    reset() {
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      // console.log(this.$refs.upload);
      // 清除文件列表
      this.$refs.upload.clearFiles();
      this.$refs.form.resetFields();
    },
    // 添加
    add(formName) {
      // console.log(this.form);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl;
          // console.log(this.imgUrl);
          console.log(this.form);
          const res = await addClassify(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取分类列表
            this.getClassifyAction();
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
    // 获取一条数据
    async getOne(data) {
      this.inState.isShow = true;
      this.inState.mode = "edit";
      console.log(data);
      this.form = data;
      this.fileList = [{ url: "http://localhost:3000" + this.form.img }];
    },
    // 修改数据
    async edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl ? this.imgUrl : this.form.img;
          // console.log(this.imgUrl);
          // console.log(this.form);
          const res = await editClassify(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取分类列表
            this.getClassifyAction();
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
    // 删除时触发的函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览时触发的函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 文件发生变化时触发
    onChange(file) {
      // console.log(file);
      // 将图片的属性提出
      this.imgUrl = file.raw;
    },
    // 文件数量超出限制时触发
    onExceed() {
      this.$message.error("文件超出上限！");
    },
    cancel() {
      this.inState.isShow = false;
      this.reset();
    },
  },
  props: ["inState"],
};
</script>

<style lang='' scoped>
</style>