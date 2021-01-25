import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import menu from "./modules/menu";
import role from "./modules/role";
import user from "./modules/user";
import classify from "./modules/classify";
import specs from "./modules/specs";
import goods from "./modules/goods";
import banner from "./modules/banner";
import member from './modules/member';
import secondKill from './modules/secondKill';

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    role,
    user,
    classify,
    specs,
    goods,
    banner,
    member,
    secondKill
  }
});
