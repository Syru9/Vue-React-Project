const state = {
  roles: []
};

const getters = {
  getRoles(state) {
    return state.roles;
  }
};

const mutations = {
  GET_ROLES(state, payload) {
    state.roles = payload;
  }
};

import { getRole } from "@/utils/axios";
const actions = {
	// 获取role列表
  async getRolesAction({ commit }) {
    const res = await getRole().catch(err => console.log(err));
    commit("GET_ROLES", res.data.list);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
