<template>
  <div id="detail">
    <detail-nav-bar ref="nav"
                    :nav-title="navTitle"
                    @backClick="backClick"
                    @titleIndex="titleIndex"/>
    <better-scroll class="scroll" ref="scroll"
                   :probeType="3"
                   :pullUpLoad="true"
                   @scrollPosition="scrollPosition">
      <!-- 轮播图，需要请求数据了 -->
      <!--    <div>{{this.$route.params.iid}}</div>-->
      <detail-swiper :swiper-img="swiperImg" @swiperImgLoad="swiperImgLoad"/>
      <!-- 商品基本介绍  -->
      <good-base-info :good-info="goodInfo"/>
      <!-- 店铺介绍 -->
      <shop-detail :shop="shopInfo"/>
      <!-- 详情图片展示 -->
      <detail-show :detail-show="detailShow" @imageLoad="imageLoad"/>
      <!--参数信息的展示-->
      <detail-param :paramInfo="detailParams" ref="param"/>
      <!-- 评论信息的展示 -->
      <detail-comment :commentInfo="commentInfo" ref="comment"/>
      <!-- 推荐信息的展示 -->
      <good-list :goods="recommendGoods" ref="recommend"/>
    </better-scroll>
    <!-- 返回顶部 -->
    <back-top v-show="isShowBack" @click.native="backTop"/>
    <!-- 吐司 -->
<!--    <toast :content="message" v-show="isShowToast"/>-->
    <!-- 底部导航栏展示 -->
    <detail-tab-bar @addCart="addCart"/>
  </div>
</template>

<script>
//子组件
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import GoodBaseInfo from "./childComps/GoodBaseInfo";
import ShopDetail from "./childComps/ShopDetail";
import DetailShow from "./childComps/DetailShow";
import DetailParam from "./childComps/DetailParam";
import DetailComment from "./childComps/DetailComment";
import DetailTabBar from "./childComps/DetailTabBar";

//公共组件
import GoodList from "components/content/goods/GoodList"
import BetterScroll from "components/common/scroll/BetterScroll";
// import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast";

//请求商品的数据
import {getDetailDatas, recommendGoods} from "network/detail";
//封装的商品对象
import {GoodInfo, ShopInfo, GoodsParam} from 'network/detail';

//防抖函数
import {debounce} from "common/utils";

//混入
import {refreshMixin, backMixin} from "common/mixin"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    GoodBaseInfo,
    ShopDetail,
    DetailShow,
    DetailParam,
    DetailComment,
    DetailTabBar,
    GoodList,
    BetterScroll,
    // BackTop,
    Toast
  },
  mixins: [refreshMixin, backMixin],
  data() {
    return {
      navTitle: ['商品', '参数', '评论', '推荐'],
      swiperImg: [],
      goodInfo: {},
      shopInfo: {},
      detailShow: {},
      detailParams: {},
      commentInfo: {},
      recommendGoods: [],
      titleOffsetTop: [],
      currIndex: 0,
      iid: '',
      // message: '',
      // isShowToast: false
    }
  },
  created() {
    //请求详情页商品的数据~网络请求被封装成返回一个Promise了
    this.iid = this.$route.params.iid;
    // console.log(iid);
    getDetailDatas(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //请求轮播图数据
      this.swiperImg = data.itemInfo.topImages;
      //请求商品基本信息
      this.goodInfo = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services);
      //请求店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo);
      // console.log(this.shopInfo);
      //请求详情信息（描述+图片）
      this.detailShow = data.detailInfo;
      // console.log(this.detailShow);
      //请求商品参数信息（尺码等等）
      this.detailParams = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //商品评论
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    //商品推荐信息
    recommendGoods().then(res => {
      // console.log(res);
      this.recommendGoods = res.data.list;
    })
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on('goodImageLoad', () => {
    //   refresh();
    // });
    // this.titleOffsetTop.push(0, paramOffsetTop, commentOffsetTop, recommentOffsetTop);
  },
  destroyed() {
    this.$bus.$off('goodImageLoad', this.imgLoadListener);
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    //轮播图图片加载完成，进行刷新
    swiperImgLoad() {
      this.$refs.scroll.refresh();
    },
    imageLoad() {
      // console.log('dayingyixia');
      this.$refs.scroll.refresh();
      //图片加载完成后获取正确的距离offsetTop
      const paramOffsetTop = this.$refs.param.$el.offsetTop;
      const commentOffsetTop = this.$refs.comment.$el.offsetTop;
      const recommentOffsetTop = this.$refs.recommend.$el.offsetTop;
      // console.log(paramOffsetTop);
      // console.log(commentOffsetTop);
      // console.log(recommentOffsetTop);
      const maxNum = Number.MAX_VALUE;
      this.titleOffsetTop.push(0, paramOffsetTop, commentOffsetTop, recommentOffsetTop, maxNum);
      // console.log(this.titleOffsetTop);
    },
    //滚动某个位置
    scrollPosition(position) {
      // console.log('滚动');
      this.isShowBack = -position.y > 1000;
      //滚动实现联动显示
      const positionY = -this.$refs.scroll.getPositionY() + 44;
      for (let i = 0; i < this.titleOffsetTop.length - 1; i++) {
        if ((this.currIndex !== i) && (this.titleOffsetTop[i] < positionY && positionY < this.titleOffsetTop[i + 1])) {
          // console.log(i);
          this.currIndex = i;
          // this.$refs.nav.$el.currIndex = this.currIndex; 加上$el 是去拿到原生的dom对象啊啊啊，咱这里是想拿到nav组件对象啊
          this.$refs.nav.currIndex = this.currIndex;
        }
      }
    },
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    titleIndex(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.titleOffsetTop[index] + 44, 500);
    },
    addCart() {
      // console.log('添加');
      //创建一个商品对象
      const product = {};
      product.iid = this.iid;
      product.count = 0;
      product.title = this.goodInfo.title;
      product.price = this.goodInfo.price;
      product.img = this.swiperImg[0];
      //调用仓库的mutations,~ 因为需要拿到提示结果的返回，所以选择actions 异步操作的 Promise
      // this.$store.commit('addToCart', product);
      this.$store.dispatch('addCart', product)
      .then(res => {
        // this.message = res;
        // this.isShowToast = true;
        // console.log('是否可以直接拿到全局组件的data中的变量呢:' + this.$toast.isShowToast);~~~可以拿到，只是刚才其他地方的代码我写错了而已
        // this.$toast.content = res;
        // this.$toast.isShowToast = true;
        // console.log(res);
        this.$toast.showMessage(res, 1000);
        // console.log(this.$toast.isShowToast);
      });
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
}

.scroll {
  height: calc(100% - 44px - 58px);
}
</style>
