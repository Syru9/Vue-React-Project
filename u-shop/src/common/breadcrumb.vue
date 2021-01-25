<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {};
</script>

<style lang='' scoped>
</style>