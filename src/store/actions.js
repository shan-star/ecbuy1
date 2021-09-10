export const actions = {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // resolve('')
      //高级find 函数
      let oldGood = null;
      oldGood = context.state.cartGoods.find(item => item.iid === payload.iid);
      if(oldGood){
        //找得到，即老商品了
        context.commit('addCount', oldGood);
        resolve('商品数量+1');
        // console.log('商品数量+1');
      }else{
        //新商品
        payload.count = 1;
        payload.isActive = true;
        // context.state.cartGoods.push(payload);
        context.commit('addGood', payload);
        resolve('添加商品');
        // console.log('添加商品');
      }
    })
  }
  // addToCart(state, payload) {
  //   // console.log(payload);
  //   //判断当前仓库是否已有该商品
  //   //最普通的for-i 循环,好点的of循环，indexof是在匹配字符串
  //   //高级find 函数
  //   let oldGood = null;
  //   oldGood = state.cartGoods.find(item => item.iid === payload.iid);
  //   if(oldGood){
  //     //找得到，即老商品了
  //     oldGood.count++;
  //     console.log('商品数量+1');
  //   }else{
  //     //新商品
  //     payload.count = 1;
  //     state.cartGoods.push(payload);
  //     console.log('添加商品');
  //   }
  // }
}
