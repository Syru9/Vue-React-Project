const state = {
  banner: []
};

const getters = {
  getBanner(state) {
    return state.banner;
  }
};

const mutations = {
  GET_BANNER(state, payload) {
    state.banner = payload;
  }
};

import { getBanner } from "@/utils/axios";
const actions = {
  // 获取 banner 列表
  async getBannerAction({ commit }) {
    const res = await getBanner().catch(er => console.log(err));
    if (res.data.code === 200) {
      // 若结果为空，赋一个空数组
      const list = res.data.list ? res.data.list : [];
      // console.log(list);
      commit("GET_BANNER", list);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
