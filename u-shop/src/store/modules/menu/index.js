const state = {
  menuList: []
};

const getters = {
  getMenuList(state) {
    return state.menuList;
  }
};

const mutations = {
  GET_MENU(state, payload) {
    state.menuList = payload;
  }
};

import { getMenu } from "./../../../utils/axios";
const actions = {
  // 获取菜单列表
  async getMenuAction({ commit }) {
    const res = await getMenu().catch(err => console.log(err));
    commit("GET_MENU", res.data.list);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
