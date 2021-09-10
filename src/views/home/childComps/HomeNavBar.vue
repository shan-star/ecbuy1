<template>
  <div class="home-nav-bar">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "HomeNavBar",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.home-nav-bar{
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: white;
}
</style>
