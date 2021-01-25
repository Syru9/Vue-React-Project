// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

// rem布局
import "./assets/js/remScale";
// 重置样式
import "./assets/css/reset.css";

// 导入字体图标
import "@/assets/fonts/iconfont.css";

// 导入 vant
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

// 导入全局组件
import myComponents from "./common";
for (const com in myComponents) {
  Vue.component(com, myComponents[com]);
}

Vue.prototype.$imgUrl = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
