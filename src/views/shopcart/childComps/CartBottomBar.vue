<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :class="{active: isCheck}" @click.native="checkClick"/>
      <div>全选</div>
    </div>
    <div class="total-price">总价格: {{}}</div>
    <div class="calculate" >去计算:({{}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

// import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    isCheck() {
      //判断是否显示全选按钮
      //使用高阶函数
      let isActive = true;
      const cartGoods = this.$store.state.cartGoods;
      const item = cartGoods.find(item => item.isActive === false);
      if(item || cartGoods.length === 0){
        isActive = false;
      }
      return isActive;
      //显示是否全选
      // if (this.$store.state.cartGoods.length === 0) return false
      // //将所有不选中的过滤到一起
      // // return !(this.cartList.filter(item => !item.isActive).length)
      // //查找不选中的
      // return !(this.$store.state.cartGoods.find(item => !item.isActive))
    }
  },
  methods: {
    checkClick() {
      //可能是全选，也可能非全选
      const isChecked = !this.isCheck;
      // console.log(this.checkClick);
      const cartGoods = this.$store.state.cartGoods;
      cartGoods.forEach(item => item.isActive = isChecked);
      // this.$store.state.cartGoods.forEach(item => item.isActive = isChecked);

      // if (this.isCheck) {    //肯定if是真的，才能进入该循环体呀
      //   this.$store.state.cartGoods.forEach(item => item.isActive = false);
      // } else {
      //   this.$store.state.cartGoods.forEach(item => item.isActive = true);
      // }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  /*border: 1px dotted #42b983;*/
  text-align: center;
  background-color: #eee;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.15);
}
.check-button{
  height: 20px;
  /* bug：图片svg~相当于文字图标（相当于文字），位置不对，是因为继承了cart-bottom-bar的line-height高度，需要重新设置一下line-height */
  line-height: 20px;
  width: 20px;
  margin-right: 5px;
  box-sizing: border-box;
}
.check-all{
  display: flex;
  align-items: center;
}
.calculate{
  height: 100%;
  width: 80px;
  background-color: var(--color-tint);
}
.active{
  color: #ff5777;
}
</style>
