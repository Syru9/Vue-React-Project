const state = {
  classifyList: []
};

const getters = {
  getClassifyList(state) {
    return state.classifyList;
  }
};

const mutations = {
  GET_CLASSIFY(state, payload) {
    state.classifyList = payload;
  }
};

import { getClassify } from "@/utils/axios";
const actions = {
  async getClassifyAction({ commit }) {
    const res = await getClassify().catch(err => console.log(err));
    console.log(res);
    commit("GET_CLASSIFY", res.data.list);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
