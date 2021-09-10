<template>
  <div class="cart-list">
    <better-scroll class="scroll" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </better-scroll>
    <!--    <div v-for="(item,index) in cartList" :key="index">{{item}}</div>-->
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import BetterScroll from "components/common/scroll/BetterScroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    BetterScroll,
  },
  data() {
    return{
      cartList: []
    }
  },
  mounted() {
    this.cartList = this.$store.state.cartGoods
  },
  //bug的产生~是因为better-scroll的滚动高度，解决~刷新高度
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  position: relative;
  height: calc(100% - 49px - 40px);
}

.scroll {
  height: 100%;
}
</style>
