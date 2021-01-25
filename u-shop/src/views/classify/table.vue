<template>
  <div>
    <el-table
      :data="getClassifyList"
      stripe
      border
      row-key="id"
      style="width: 100%"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <div>
            <img
              width="100px"
              :src="$imgUrl + scope.row.img"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="warning"
              size="small"
              @click="getOne(scope.row.id)"
              round
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row.id)"
              round
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteClassify, getClassifyInfo } from "@/utils/axios";
export default {
  data() {
    return {};
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
      getClassifyAction: "classify/getClassifyAction",
    }),
    // 删除
    async del(id) {
      const res = await deleteClassify(id).catch((err) => console.log(err));
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        this.getClassifyAction();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改时获取信息
    async getOne(id) {
      const res = await getClassifyInfo(id).catch((err) => console.log(err));
      // console.log(res);
      if(res.data.code === 200){
        // 赋值 id 便于修改
        res.data.list.id = id;
        this.$emit('getClassifyInfo',res.data.list);
      }
    },
  },
};
</script>

<style lang='' scoped>
</style>