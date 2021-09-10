<template>
    <div class="check-button" :class="{active: isActive}">
      <img src="~assets/img/cart/tick.svg" alt=""/>
    </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button{
  position: relative;
  border: 2px solid #999;
  background-color: #999;
  border-radius: 50%;
  cursor: pointer;
}
.active{
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
img{
  vertical-align: center;
}
</style>
