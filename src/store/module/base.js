import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  baseInfo: {
    firstName: undefined,
    lastName: undefined,
    nickName: undefined,
    gender: undefined,
    email: undefined,
    mobile: undefined,
    province: undefined,
    city: undefined,
    area: undefined,
    street: undefined,
  },
};
const getters = {

};
const mutations = {
  SET_BASE_INFO(state, payload) {
    state.baseInfo = Object.assign(state.baseInfo, payload);
  },
};
const actions = {
  setBaseInfo({ commit }, payload) {
    commit('SET_BASE_INFO', payload);
  },
};

// 导出模块，在index.js中引入使用
export default {
  state,
  getters,
  mutations,
  actions,
};
