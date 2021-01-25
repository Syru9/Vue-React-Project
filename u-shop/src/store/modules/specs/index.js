const state = {
  specs: [],
  size: 2, //查询条数
  page: 1, // 页数
  total: 0 // 总数
};

const getters = {
  getSpecs(state) {
    return state.specs;
  },
  getSize(state) {
    return state.size;
  },
  getPage(state) {
    return state.page;
  },
  getTotal(state) {
    return state.total;
  }
};

const mutations = {
  // 获取规格列表
  GET_SPECS(state, payload) {
    state.specs = payload;
  },
  // 获取总量
  GET_TOTAL(state, payload) {
    state.total = payload;
  },
  // 切换页码
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  }
};

import { getSpecs, getSpecsCount } from "@/utils/axios";
const actions = {
  // 获取specs列表
  async getSpecsAction({ commit, getters,dispatch }) {
    const data = {
      size: getters.getSize,
      page: getters.getPage
    };
    const res = await getSpecs(data).catch(err => console.log(err));
    // console.log(res);
    if (res.data.code === 200) {
      // console.log(res.data);
      if (res.data.list.length == 0 && getters.getPage !== 1) {
        dispatch("changePageAction", getters.getPage - 1);
      }
      commit("GET_SPECS", res.data.list);
    }
  },
  // 获取总条数
  async getSpecsCountAction({ commit }) {
    const res = await getSpecsCount().catch(err => console.log(err));
    // console.log(res);
    if (res.data.code === 200) {
      commit("GET_TOTAL", res.data.list[0].total);
    }
  },
  // 更换页数
  async changePageAction({ commit, dispatch }, payload) {
    commit("CHANGE_PAGE", payload);
    dispatch("getSpecsAction");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
