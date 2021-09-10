<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <img src="~assets/img/common/back.svg" alt="" slot="left" @click="backClick"/>
      <div class="nav-title" slot="center">
        <span v-for="(item,index) in navTitle" :key="index"
              @click="titleClick(index)"
              :class="{active: currIndex===index}">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data(){
    return{
      currIndex: 0
    }
  },
  props: {
    navTitle: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    titleClick(index) {
      // console.log(index);
      this.currIndex = index;
      this.$emit('titleIndex', index);
    },
    backClick(){
      this.$emit('backClick');
    }
  }
}
</script>

<style scoped>
.nav-title{
  position: relative;
  /*z-index: 1;*/
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 14px;
}
img{
  vertical-align: center;
  margin-top: 10px;
}
.active{
  color: var(--color-tint);
}
</style>
