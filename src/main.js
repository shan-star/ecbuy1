import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
//安装的插件，因为导出的时候default了名字可以随意啊
import Toast from "components/common/toast";
Vue.config.productionTip = false

//创建总线，即new一个Vue，原型有总线
Vue.prototype.$bus = new Vue()

//安装Toast 插件
Vue.use(Toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
