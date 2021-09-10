<template>
  <div id="shopcart">
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "shopcart",
  components: {
    CartList,
    CartBottomBar
  },
}
</script>

<style scoped>
#shopcart{
  position: relative;
  height: 100vh;
}

</style>
