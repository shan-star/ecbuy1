<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item  path="/home">
        <img slot="img-item" src="~assets/img/tabBar/home.svg" alt=""/>
        <img slot="img-item-active" src="~assets/img/tabBar/home_active.svg" alt=""/>
        <div slot="title-item">首页</div>
      </tab-bar-item>
      <tab-bar-item  path="/category">
        <img slot="img-item" src="~assets/img/tabBar/category.svg" alt=""/>
        <img slot="img-item-active" src="~assets/img/tabBar/category_active.svg" alt=""/>
        <div slot="title-item">分类</div>
      </tab-bar-item>
      <tab-bar-item  path="/shopcart">
        <img slot="img-item" src="~assets/img/tabBar/shopcart.svg"  alt=""/>
        <img slot="img-item-active" src="~assets/img/tabBar/shopcart_active.svg"  alt=""/>
        <div slot="title-item">购物车</div>
      </tab-bar-item>
      <tab-bar-item  path="/profile">
        <img slot="img-item" src="~assets/img/tabBar/profile.svg" alt=""/>
        <img slot="img-item-active" src="~assets/img/tabBar/profile_active.svg" alt=""/>
        <div slot="title-item">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar";
import TabBarItem from "components/common/tabBar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.main-tab-bar{
  font-size: 13px;
}
img{
  height: 22px;
  width: 22px;
  margin: 2px 0;
}
</style>
