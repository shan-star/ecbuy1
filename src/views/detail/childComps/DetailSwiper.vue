<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="(item,index) in swiperImg" :key="index" class="detail-swiper-item">
        <img :src="item" alt="" @load="swiperImgLoad"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index"
export default {
  name: "DetailSwiper",
   components: {
    Swiper,
    SwiperItem
   },
  props: {
    swiperImg: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    swiperImgLoad(){
      this.$emit('swiperImgLoad');
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  width: 100%;
}
.detail-swiper-item{
  height: 250px;
}
</style>
