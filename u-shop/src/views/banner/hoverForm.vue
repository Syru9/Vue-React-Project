<template>
  <div>
    <el-dialog
      :title="inState.mode == 'add' ? '添加轮播图' : '修改轮播图'"
      :visible.sync="inState.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
        <el-button v-else type="primary" @click="edit('form')">
          修改
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBanner, getBannerInfo, editBanner } from "@/utils/axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      // 验证
      rules: {
        title: [
          { required: true, message: "请填写轮播图标题", trigger: "blur" },
        ],
      },
      // 预览图片地址
      dialogImageUrl: "",
      // 文件列表
      fileList: [],
    };
  },
  methods: {
    ...mapActions({
      getBannerAction: "banner/getBannerAction",
    }),
    // 重置表单
    reset() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.$refs.upload.clearFiles();
      this.$refs.form.resetFields();
    },
    cancel() {
      this.inState.isShow = false;
      this.reset();
    },
    // 添加
    add(formName) {
      // console.log(this.form);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl;
          console.log(this.form);
          const res = await addBanner(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取 banner 列表
            this.getBannerAction();
            this.inState.isShow = false;
            this.cancel();
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取一条 banner
    async getOne(id) {
      // console.log(id);
      const res = await getBannerInfo(id).catch((err) => console.log(err));
      // console.log(res);
      if (res.data.code === 200) {
        this.inState.isShow = true;
        this.inState.mode = "edit";
        this.form = res.data.list;
        this.form.id = id;
        this.fileList = [{ url: this.$imgUrl + this.form.img }];
        // console.log(this.fileList);
      }
    },
    // 编辑
    edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl ? this.imgUrl : this.form.img;
          // console.log(this.form);
          const res = await editBanner(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 重新获取 banner 列表
            this.getBannerAction();
            this.inState.isShow = false;
            this.cancel();
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
  },
  props: ["inState"],
};
</script>

<style lang='' scoped>
</style>