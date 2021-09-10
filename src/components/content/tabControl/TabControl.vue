<!-- 选项卡与业务有关 -->
<template>
  <div class="tab-control">
    <!-- 选项卡都是文字，可以简单的方式实现，不用再使用插槽替换啦 -->
<!--    <slot></slot>-->
    <!-- 接下来实现点击传递index给父组件 -->
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index"
         @click="itemClick(index)"
          :class="{active: currIndex===index}">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles: {
      type: Array,
      default(){
        return ['流行', '新款', '精选']
      }
    }
  },
  data(){
    return{
      currIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currIndex = index;
      this.$emit('titleIndex', index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 14px;
}
.tab-control-item{
  flex: 1;
  text-align: center;
}
.active{
  color: #ff5777;
}
</style>
