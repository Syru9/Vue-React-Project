<template>
  <el-dialog
    :title="inState.mode == 'add' ? '添加商品' : '修改商品'"
    :visible.sync="inState.isShow"
    :before-close="cancel"
    center
    @opened="createEditor"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item
        label="一级分类"
        prop="first_cateid"
        :label-width="formLabelWidth"
      >
        <el-select
          @change="changeFirst(false)"
          v-model="form.first_cateid"
          placeholder="请选择"
        >
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
        label="二级分类"
        prop="second_cateid"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option
            v-for="item in secondCate"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="goodsname"
        label="商品名称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="市场价格"
        prop="market_price"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
      <el-form-item
        label="商品规格"
        prop="specsid"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.specsid"
          @change="changeSpecs"
          placeholder="请选择"
        >
          <el-option
            v-for="item in getSpecs"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="规格属性"
        prop="specsattr"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.specsattr" placeholder="请选择">
          <el-option
            v-for="item in attrs"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-radio v-model="form.isnew" :label="1">是</el-radio>
        <el-radio v-model="form.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio v-model="form.ishot" :label="1">是</el-radio>
        <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
      <!-- editor -->
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <div id="editor"></div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="inState.mode == 'add'" @click="add('form')" type="primary">
        确 定
      </el-button>
      <el-button v-else type="primary" @click="edit('form')"> 修改 </el-button>
    </div>
  </el-dialog>
</template>

<script>
// todo  添加列表、重置列表 等。。。
import { mapGetters, mapActions } from "vuex";
import { addGoods, getGoodsInfo, editGoods } from "@/utils/axios";
import E from "wangeditor";
export default {
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCate: [],
      attrs: [],
      // 提出图片的信息属性
      imgUrl: "",
      // 预览图片地址
      dialogImageUrl: "",
      // 文件列表
      fileList: [],
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getClassifyAction();
    this.getSpecsAction();
  },
  computed: {
    ...mapGetters({
      getClassifyList: "classify/getClassifyList",
      getSpecs: "specs/getSpecs",
    }),
  },
  methods: {
    ...mapActions({
      getClassifyAction: "classify/getClassifyAction",
      getSpecsAction: "specs/getSpecsAction",
      getGoodsAction: "goods/getGoodsAction",
      getGoodsCountAction: "goods/getGoodsCountAction",
    }),
    // 创建 editor
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      //清空重置多余的 editor，避免嵌套
      this.editor.txt.html("");
    },
    // 重置
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      // 重置验证
      this.$refs.form.resetFields();
      this.fileList = [];
    },
    // 获取一条数据
    async getOne(id) {
      const res = await getGoodsInfo({ id }).catch((err) => console.log(err));
      if (res.data.code == 200) {
        this.form = res.data.list;
        // 添加 id
        this.form.id = id;
        this.inState.isShow = true;
        this.inState.mode = "edit";
        // 将图片添加到表单
        this.fileList = res.data.list.img
          .split(",")
          .map((item) => ({ url: this.$imgUrl + item }));
        // 重新获取联动菜单
        this.changeFirst(true);
        this.changeSpecs(true);
      }
    },
    // 添加
    async add(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl;
          this.form.description = this.editor.txt.html();
          this.form.price = Number(this.form.price);
          this.form.market_price = Number(this.form.market_price);
          console.log(this.form);
          const res = await addGoods(this.form).catch((err) =>
            console.log(err)
          );
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 更改页码
            this.getGoodsCountAction();
            // 重新获取列表
            this.getGoodsAction();
            this.reset();
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
    // 修改
    async edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.img = this.imgUrl ? this.imgUrl : this.form.img;
          this.form.description = this.editor.txt.html();
          this.form.price = Number(this.form.price);
          this.form.market_price = Number(this.form.market_price);
          console.log(this.form);
          const res = await editGoods(this.form).catch((err) =>
            console.log(err)
          );
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            // 更改页码
            this.getGoodsCountAction();
            // 重新获取列表
            this.getGoodsAction();
            this.reset();
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
    cancel() {
      this.inState.isShow = false;
      this.reset();
    },
    // 更改一级分类
    changeFirst(flag) {
      const index = this.getClassifyList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      if (!flag) {
        this.form.second_cateid = "";
      }
      this.secondCate = this.getClassifyList[index].children;
    },
    // 更改商品规格
    changeSpecs(flag) {
      const index = this.getSpecs.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrs = this.getSpecs[index].attrs;
      if (!flag) {
        this.form.specsattr = "";
      }
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