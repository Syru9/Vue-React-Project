import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 将index的路由导出，用于添加 menu
export const indexRouter = [
  {
    path: "/menu",
    component: () => import("@/views/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "/role",
    component: () => import("@/views/role/role"),
    name: "角色管理"
  },
  {
    path: "/user",
    component: () => import("@/views/user/user"),
    name: "管理员管理"
  },
  {
    path: "/goods",
    component: () => import("@/views/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/classify",
    component: () => import("@/views/classify/classify"),
    name: "商品分类"
  },
  {
    path: "/specs",
    component: () => import("@/views/specs/specs"),
    name: "商品规格"
  },
  {
    path: "/banner",
    component: () => import("@/views/banner/banner"),
    name: "轮播图管理"
  },
  {
    path: "/member",
    component: () => import("@/views/member/member"),
    name: "会员管理"
  },
  {
    path: "/secondKill",
    component: () => import("@/views/secondKill/secondKill"),
    name: "秒杀活动"
  },

];
const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/home",
          component: () => import("@/views/home")
        },
        ...indexRouter,
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 如果是前往 login 放行
  if (to.path == "/login") {
    return next();
  }
  // 如果有登录状态，就放行
  if (sessionStorage.getItem("login")) {
    return next();
  }
  // 如果没有，就强制跳转到login页面
  next("/login");
});

export default router;
