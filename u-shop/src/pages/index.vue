<template>
  <div>
    <el-container class="outer">
      <el-header><h1>小U后台管理系统</h1></el-header>
      <el-container class="main">
        <el-aside>
          <left-menu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import leftMenu from "./../components/leftMenu";
export default {
  components: {
    leftMenu,
  },
};
</script>

<style lang='less' scoped>
.outer {
  .el-header {
    background: #ecf0f1;
    h1 {
      font-size: 22px;
      line-height: 60px;
    }
  }
}
</style>