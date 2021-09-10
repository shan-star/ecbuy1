//安装插件的形式
import Toast from "./Toast";
const plugin = {}
//安装
// plugin.install('函数')
//install时回调一下函数~~~~~
plugin.install = (Vue => {
  //1,构建构建器对象（构建器类-》new 构建器对象）
  const constructor = Vue.extend(Toast);
  const toast = new constructor();
  //2，手动挂载构造器对象到某个元素标签上,并且文档流中添加toast的dom对象内容
  toast.$mount(document.createElement('div'));
  document.body.appendChild(toast.$el);
  //3，Vue对象添加上toast 属性原型，使其成为全局属性
  Vue.prototype.$toast = toast;
})
export default plugin


