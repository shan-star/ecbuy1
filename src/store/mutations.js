export const mutations = {
  addCount(state, payload){
    payload.count++;
  },
  addGood(state, payload){
    payload.count = 1;
    state.cartGoods.push(payload);
  }
}
