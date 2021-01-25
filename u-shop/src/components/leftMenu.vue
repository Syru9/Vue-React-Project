<template>
  <div class="nav">
    <el-row>
      <el-col>
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in navList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="one in item.children"
              :key="one.id"
              :index="one.url"
              >{{ one.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [],
    };
  },
  mounted() {
    const result = JSON.parse(sessionStorage.getItem("login"));
    this.navList = result.menus;
  },
};
</script>

<style lang='less' scoped>
.el-menu {
  height: calc(100vh - 60px);
  background: #545c64;
}
</style>