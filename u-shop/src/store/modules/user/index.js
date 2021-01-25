const state = {
  user: [],
  size: 2, // 查询条数
  page: 1, // 页码数
  total: 0 // 总条数
};

const getters = {
  getUser(state) {
    return state.user;
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
  // 获取用户
  GET_USER(state, payload) {
    state.user = payload;
  },
  // 获取总条数
  GET_TOTAL(state, payload) {
    state.total = payload;
  },
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  }
};

import { getUser, userCount } from "@/utils/axios";
const actions = {
  // 获取用户
  async getUserAction(context) {
    const data = {
      size: context.getters.getSize,
      page: context.getters.getPage
    };
    const res = await getUser(data).catch(err => console.log(err));
    if (res.data.code === 200) {
      // console.log(res.data);
      // 如果删除某一页的最后一项，自动调整页码到前一页
      if (res.data.list == null && context.state.page !== 1) {
        context.dispatch("changePageAction", context.state.page - 1);
      }
      context.commit("GET_USER", res.data.list);
    }
  },
  // 获取总条数
  async getTotalAction({ commit }) {
    const res = await userCount().catch(err => console.log(err));
    commit("GET_TOTAL", res.data.list[0].total);
  },
  // 修改页数
  async changePageAction(context, payload) {
    context.commit("CHANGE_PAGE", payload);
    context.dispatch("getUserAction");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
