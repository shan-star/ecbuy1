//首页数据请求
import {request} from './request'

export function homeMultiDatas(){
  return request({
    url: '/home/multidata'
  })
}

//获取商品信息
export function getGoods(type, page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

//临散的商品信息封装成一个类
//将商品信息封装成一个对象
// export const good = {
//   constructor({})
// }
