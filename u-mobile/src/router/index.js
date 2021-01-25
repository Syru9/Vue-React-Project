import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/home",
          component: () => import("@/views/home"),
          name:'小U商城'
        },
        {
          path: "/classify",
          component: () => import("@/views/classify"),
          name:'分类'
        },
        {
          path: "/cart",
          component: () => import("@/views/cart"),
          name:'购物车'
        },
        {
          path: "/mine",
          component: () => import("@/views/mine"),
          name:'我的'
        },
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path:'/goodsList',
      component:()=>import('@/pages/goodsList'),
      name:'商品列表'
    },
    {
      path:'/goodsDetail',
      component:()=>import('@/pages/goodsDetail'),
      name:'商品详情'
    },
    {
      path:'/register',
      component:()=>import('@/pages/register'),
      name:'注册'
    },
    {
      path:'/login',
      component:()=>import('@/pages/login'),
      name:'登录'
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});
