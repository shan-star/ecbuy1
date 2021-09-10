<template>
  <div class="home-swiper">
    <Swiper>
      <SwiperItem class="swiper-item" v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad"/>
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    swiperImgLoad(){
      // this.$emit('swiperImageLoad');
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style scoped>



</style>
