<template>
  <div class="tab-bar-item" @click="itemClick" :class="{active: isActive}">
    <!-- 因为设置了color后，文字颜色是可以发生改变，但是svg图片不能，所以，咱选则通过两张图片v-if的方式来控制显示 -->
    <!--v-if 选择套在div上，是因为slot最终被替换--->
    <div v-if="!isActive"><slot name="img-item"></slot></div>
    <div v-else><slot name="img-item-active" ></slot></div>
    <slot name="title-item"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      default(){
        return ''
      }
    }
  },
  computed: {
    isActive(){
      // console.log(this.$route.path);
      //在computed里，因为html dom 渲染时立马执行它，一个TTabBarItem对应一个this.path，分别页面就有
      // /home  /category   /shopcart   /profile
      //this.$route.path 就是当前活跃的路由
      return this.$route.path === this.path
      // return this.$route.path.indexOf(this.path) !== -1;
      // return this.path.indexOf(this.$route.path) !== -1;
    }
  },
  methods: {
    itemClick(){
      //路由器对象添加路由~逻辑是这样的：
      //.catch(err => {}) 解决路由重复的bug
      this.$router.push(this.path).catch(err => {});
    }
  }

}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
.active{
  color: var(--color-tint);
}
</style>
