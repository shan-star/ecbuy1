<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 6px solid rgba(100, 100, 100, .1);
}
.recommend-item a{
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  font-size: 12px;
}
img{
  height: 60px;
  width: 60px;
  margin-bottom: 8px;
}
</style>
