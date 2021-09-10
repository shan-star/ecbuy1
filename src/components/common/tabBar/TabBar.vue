<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
import TabBarItem from "./TabBarItem";
export default {
  name: "TabBar",
  components: {
    TabBarItem
  }
}
</script>

<style scoped>
#tab-bar{
  position: fixed;
  z-index:1;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
  box-shadow: 0 1px 1px rgba(100,100,100,.2);
}
</style>
