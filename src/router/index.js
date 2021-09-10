//安装路由
import Vue from 'vue';
import VueRouter from "vue-router";

//懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter);
//配置映射关系
const routes = [
  //默认路径~使用重定向
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
//new VueRouter创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

//导出路由对象
export default router
