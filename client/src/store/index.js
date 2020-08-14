import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

Vue.use(Vuex);

const state = {
  isAuthenticated: false, // 是否授权
  user: {},
  profile:{},
  loading:false
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
