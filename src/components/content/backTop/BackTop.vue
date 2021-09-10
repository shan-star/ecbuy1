<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt=""/>
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
.back-top{
  position: absolute;
  z-index: 2;
  bottom: 59px;
  right: 10px;
}
img{
  width: 60px;
  height: 60px;
}
</style>
