<template>
  <div class="better-scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: "BetterScroll",
  data(){
    return{
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //使用:创建better-scroll 对象，挂载上某个元素
    this.scroll = new BetterScroll(this.$refs.scroll ,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    //better-scroll,事件监听方式类似于组件，on与emit
    // 监听下拉动作
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
        // console.log('xiala');
      })
    }
    //监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
        this.$emit('scrollPosition', position);
      })
    }
  },
  methods: {
    refresh(){
      //直接执行刷新，而不是将刷新结果返回
      // console.log('shua');
      this.scroll && this.scroll.refresh && this.scroll.refresh();
      // return this.scroll.refresh();
    },
    finishedPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    //滚动函数scrollTo
    scrollTo(x, y, time = 500){
      this.scroll.scrollTo(x, y, time);
    },
    getPositionY(){
      return this.scroll.y;
    }
  }
}
</script>

<style scoped>
.better-scroll{
  /* beter-scroll需要设置overflow: hidden才可以滚动  */
  overflow: hidden;
}
</style>
