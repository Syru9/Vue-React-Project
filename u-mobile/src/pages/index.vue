<template>
  <div>
    <router-view />
    <bottom-nav />
  </div>
</template>

<script>
import bottomNav from './../components/bottomNav';
export default {
  components:{
    bottomNav
  }
};
</script>

<style lang='' scoped>
</style>