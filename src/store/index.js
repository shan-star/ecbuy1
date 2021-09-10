//安装store（参数state，mutations、actions。。。），导出
import Vue from 'vue';
import Vuex from 'vuex';
import {mutations} from "./mutations";
import {actions} from "./actions";

Vue.use(Vuex);

const state =  {
  cartGoods: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

//导出
export default store
