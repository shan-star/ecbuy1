<template>
  <div id="app">
    <!-- 实现数据缓存 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

<!--      <router-view/>-->
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from "components/content/mainTabBar/MainTabBar";
export default {
  name: 'app',
  components: {
    MainTabBar,
  }
}
</script>
<style>
@import 'assets/css/base.css';


#app {

}
</style>
