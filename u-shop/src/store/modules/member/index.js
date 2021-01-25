const state = {
  member: []
};

const getters = {
  getMember(state) {
    return state.member;
  }
};

const mutations = {
  GET_MEMBER(state, payload) {
    state.member = payload;
  }
};

import { getMember } from "@/utils/axios";
const actions = {
  async getMemberAction({ commit }) {
    const res = await getMember().catch(err => console.log(err));
    if (res.data.code === 200) {
      const list = res.data.list ? res.data.list : [];
      commit("GET_MEMBER", list);
    }
    // console.log(res);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
