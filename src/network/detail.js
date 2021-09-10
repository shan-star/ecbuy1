//获取详情页数据
import {request} from "./request";

export function getDetailDatas(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//获取推荐商品数据
export function recommendGoods(){
  return request({
    url: '/recommend'
  })
}



//将商品信息封装成一个对象
export class GoodInfo{
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.oldPrice = itemInfo.oldPrice;
    this.price = itemInfo.price;
    this.disCountDesc = itemInfo.discountDesc;
    this.saleNum = columns[0];
    this.cfav = columns[1];
    this.services = services;
  }
}

//数据量比较多的情况下也封装成一个类~店铺信息
export class ShopInfo{
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}

//商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}


