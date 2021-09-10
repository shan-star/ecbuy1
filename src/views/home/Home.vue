<template>
  <div id="home">
    <home-nav-bar/>
    <tab-control class="tab-control1" @titleIndex="showGoods" v-show="isShowTab" ref="tabControl1"/>
    <better-scroll class="scroll" ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @pullingUp="loadMore"
      @scrollPosition="scrollPosition">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control2" @titleIndex="showGoods" ref="tabControl2"/>
      <good-list :goods="goods[goodType].list"/>
    </better-scroll>
    <!-- 监听滚动到一定位置才显示出来,添加点击事件回到顶部 -->
    <back-top v-show="isShowBack" @click.native="backTop"/>
  </div>
</template>

<script>
//子组件
import HomeNavBar from "./childComps/HomeNavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import FeatureView from "./childComps/FeatureView";
//公共组件
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
// import BackTop from "components/content/backTop/BackTop";
//网络请求
import {homeMultiDatas, getGoods} from "network/home";

//使用插件better-scroll实现滚动
import BetterScroll from "components/common/scroll/BetterScroll";

//使用防抖函数
import {debounce} from "common/utils";
//使用混入
import { refreshMixin, backMixin } from "common/mixin"

export default {
  name: "Home",
  components: {
    HomeNavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodList,
    // BackTop,
    BetterScroll
  },
  mixins: [refreshMixin, backMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goodType: 'pop',
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      // isShowBack: false,
      isShowTab: false,
      // offsetTop: 0,
      // imgLoadListener: null,
      saveY: 0
    }
  },
  created() {
    this.homeMultiDatas();
    this.getGoodsInfo('pop');
    this.getGoodsInfo('new');
    this.getGoodsInfo('sell');
  },
  mounted() {
    //本来有30张图片的，没进行图片的防抖或节流，按道理刷新是要进行30次的，但是界面只有一次刷新
    // this.imgLoadListener = debounce(this.$refs.scroll.refresh, 500)
    // this.$bus.$on('goodImageLoad', () => {
    //   // this.$refs.scroll.refresh();
    //   this.imgLoadListener();
      //刷新后再获取高度，获取选项卡离顶部的距离
      // this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.offsetTop);
    // })
  },
  //在keep-alive下使用激活函数、非激活函数，监听better-scroll的事件或者去除better-scroll的事件
  activated(){
    //激活状态时，因为mounted挂载dom时，已经为需要显示的图片，实现刷新30多张图片了，从非激活的状态回来，只需要刷新一下即可
    this.$refs.scroll.refresh();
    //回到离开前的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 1000);
    // console.log('激活');
  },
  deactivated() {
    //记录当前位置
    this.saveY = this.$refs.scroll.getPositionY();
    //离开页面去除better-scroll监听事件,this.$bus.$off('事件名称'， 要销毁的函数~要销毁了呀，不会被执行的)
    this.$bus.$off('goodImgLoad', this.imgLoadListener)
  },
  methods: {
    /**
     * 网络请求数据
     */
    //获取首页轮播图、推荐、特色数据
    homeMultiDatas() {
      homeMultiDatas().then(res => {
        // console.log(res.data);
        // console.log(res.data.banner.list);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //获取商品数据
    getGoodsInfo(type) {
      const page = this.goods[type].page + 1;
      getGoods(type, page).then(res => {
        // console.log(res.data.list);
        //商品信息iid、title、cafv（收藏）、price
        // this.goods = res.data.list; 这是不对的，因为咱的数据是一页、一页都要存在的，需要选择追加的push进去
        const data = res.data.list;
        this.goods[type].list.push(...data);
        // console.log(this.goods[type].list);
        this.goods[type].page++;
      })
    },
    /**
     * 监听事件相关的
     */
    showGoods(index) {
      switch (index) {
        case 0:
          this.goodType = 'pop';
          break;
        case 1:
          this.goodType = 'new';
          break;
        case 2:
          this.goodType = 'sell';
          break;
      }
      //点击选项卡，要统一两个选项卡的选项
      this.$refs.tabControl1.currIndex = index;
      this.$refs.tabControl2.currIndex = index;
    },
    swiperImageLoad(){
      this.$refs.scroll.refresh();
      //刷新后再获取高度，获取选项卡离顶部的距离
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.offsetTop);
    },
    //请求下一页数据
    loadMore(){
      //完成一次下拉动作
      this.$refs.scroll.finishedPullUp();
      this.getGoodsInfo(this.goodType);
    },
    //滚动某个位置
    scrollPosition(position){
      this.isShowBack = -position.y > 1000;
      //障眼法显示选项卡的吸顶作用，监听滚动位置
      // console.log(this.offsetTop);
      // console.log(this.$refs.scroll.getPositionY());
      this.isShowTab = -position.y >= this.offsetTop;
      // this.isShowTab = -(this.$refs.scroll.getPositionY()) >= this.offsetTop;
    },
    // //回到顶部
    // backTop(){
    //   this.$refs.scroll.scrollTo(0, 0, 1000);
    // }

  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.scroll{
  position: absolute;
  height: calc(100% - 44px - 49px);
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.tab-control1{
  position: relative;
  background-color: white;
  z-index: 1;
}
</style>
