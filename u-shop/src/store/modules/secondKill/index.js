const state = {
  secondKill: []
};

const getters = {
  getSecondKill(state) {
    return state.secondKill;
  }
};

const mutations = {
  GET_SECOND_KILL(state, payload) {
    state.secondKill = payload;
  }
};

import { getSecondKill } from "@/utils/axios";
const actions = {
  // 获取秒杀列表
  async getSecondKillAction({ commit }) {
    const res = await getSecondKill().catch(err => console.log(err));
    if (res.data.code === 200) {
      const list = res.data.list ? res.data.list : [];
      // console.log(res);
      commit("GET_SECOND_KILL", list);
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
