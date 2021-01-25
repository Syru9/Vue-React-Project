<template>
  <div>
    <el-dialog
      :title="inState.mode == 'add' ? '添加秒杀' : '修改秒杀'"
      :visible.sync="inState.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="活动名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- ! 时间 ! -->
        <el-form-item label="活动期限" prop="" :label-width="formLabelWidth">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="一级分类"
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="firstChange(false)"
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
          <el-select
            v-model="form.second_cateid"
            @change="secondChange(false)"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="goodsid" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择分类">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import { mapGetters, mapActions } from "vuex";
import {
  addSecondKillInfo,
  getGoods,
  getSecondKillInfo,
  editSecondKill,
} from "@/utils/axios";
export default {
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
        status: 1,
      },
      time: [],
      secondCate: [],
      goods: [],
      formLabelWidth: "120px",
      // 验证
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      getClassifyList: "classify/getClassifyList",
    }),
  },
  mounted() {
    this.getClassifyAction();
  },
  methods: {
    ...mapActions({
      // 获取分类
      getClassifyAction: "classify/getClassifyAction",
      // 获取活动列表
      getSecondKillAction: "secondKill/getSecondKillAction",
    }),
    // 更改一级分类触发
    firstChange(flag) {
      const index = this.getClassifyList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCate = this.getClassifyList[index].children;
      if (!flag) {
        this.form.second_cateid = "";
      }
      // console.log(index);
    },
    // 更改二级分类触发
    async secondChange(flag) {
      const res = await getGoods({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).catch((err) => console.log(err));
      console.log(res);
      this.goods = res.data.list;
      if (!flag) {
        this.form.goodsid = "";
      }
    },
    cancel() {
      this.reset();
      this.inState.isShow = false;
    },
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
        status: 1,
      };
      // 重置验证
      this.$refs.form.resetFields();
    },
    // 添加
    async add(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.time);
          this.form.begintime = new Date(this.time[0]).getTime();
          this.form.endtime = new Date(this.time[1]).getTime();
          const res = await addSecondKillInfo(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getSecondKillAction();
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
    // 获取一条数据
    async getOne(id) {
      const res = await getSecondKillInfo(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        const list = res.data.list;
        const beginTime = new Date(parseInt(list.begintime));
        const endTime = new Date(parseInt(list.endtime));
        // console.log(beginTime, endTime);
        this.form = list;
        this.form.id = id;
        // 时间
        this.time = [beginTime, endTime];
        this.inState.isShow = true;
        this.inState.mode = "edit";
        // console.log(this.form);
        // 重新获取二级分类和商品内容
        this.firstChange(true);
        this.secondChange(true);
      }
      // console.log(res);
    },
    // 修改一条数据
    edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.time);
          this.form.begintime = new Date(this.time[0]).getTime();
          this.form.endtime = new Date(this.time[1]).getTime();
          const res = await editSecondKill(this.form).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getSecondKillAction();
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
  },
  props: ["inState"],
};
</script>

<style lang='' scoped>
</style>