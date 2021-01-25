// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// 状态管理
import store from "./store";

// 导入element-ui
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(elementUI);

// reset.css
import "@/assets/css/reset.css";

// 全局组件
import common from "@/common";
for (const component in common) {
  Vue.component(component, common[component]);
}

Vue.config.productionTip = false;

Vue.prototype.$imgUrl = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
