//封装网络请求的方法
import axios from 'axios'
export function request(config){
  //创建axios实例，通过axios.create的方法
  const instance = axios.create({
    //基本配置
    baseURL: 'http://152.136.185.210:7878/api/m5',
  })
  //返回axios实例（axios内部实际上封装了一个Promise）
    //进行拦截处理,调用interceptors拦截器对象(请求拦截)
    instance.interceptors.request.use((config) => {
      return config
    }, err => {
      console.log(err);
    })
    //进行拦截处理,调用interceptors拦截器对象(结果拦截)
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      console.log(err);
    })

    //返回网络请求结果
    return instance(config)
}
