import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";

Vue.use(Vuex);

const state = {
  isAuthenticated: false, // 是否授权
  user: {}
};

export default new Vuex.Store({
  state,
  getters,
  mutations: {},
  actions: {}
});
