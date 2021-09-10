<template>
  <div class="good-list">
    <!-- 要想在子组件上显示数据，需要父将数据传递给子组件（父子组件之间的通信） -->
    <good-list-item v-for="(item,index) in goods" :key="index"
      :good-item="item"/>
<!--    <div v-for="(item,index) in goods" :key="index">{{item.title}}</div>-->
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";
export default {
  name: "GoodList",
  props: {
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
.good-list{
  display: flex;
  /* 要换行，不然都挤在一起呀  */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
</style>
