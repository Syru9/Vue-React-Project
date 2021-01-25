const state = {
  goods: [],
  size: 3, //查询条数
  page: 1, // 页数
  total: 0 // 总数
};

const getters = {
  getGoods(state) {
    return state.goods;
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
  GET_GOODS(state, payload) {
    state.goods = payload;
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

import { getGoods, getGoodsCount } from "@/utils/axios";
const actions = {
  // 获取goods列表
  async getGoodsAction({ commit, getters, dispatch }) {
    const data = {
      size: getters.getSize,
      page: getters.getPage
    };
    const res = await getGoods(data).catch(err => console.log(err));
    // console.log(res);
    if (res.data.code === 200) {
      // console.log(res.data);
      if (!res.data.list && getters.getPage !== 1) {
        dispatch("changePageAction", getters.getPage - 1);
      }
      commit("GET_GOODS", res.data.list);
    }
  },
  // 获取总条数
  async getGoodsCountAction({ commit }) {
    const res = await getGoodsCount().catch(err => console.log(err));
    // console.log(res);
    if (res.data.code === 200) {
      commit("GET_TOTAL", res.data.list[0].total);
    }
  },
  // 更换页数
  async changePageAction({ commit, dispatch }, payload) {
    commit("CHANGE_PAGE", payload);
    dispatch("getGoodsAction");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
