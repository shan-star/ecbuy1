import {debounce} from "./utils";
//混入刷新, 因为选项卡的offset，是在监听图片加载完成回调刷新时才获取正确的值，所以选项卡是需要进行抽离（”买一送一“）
export const refreshMixin = {
  data(){
    return{
      // offsetTop: 0,
      imgLoadListener: null
    }
  },
  mounted(){
    this.imgLoadListener = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on('goodImageLoad', () => {
      this.imgLoadListener();
      // //刷新后再获取高度，获取选项卡离顶部的距离(因为选项卡的位置是在偏上，获取器顶部高度其实关注点是它所在位置之上有没有图片的加载完成即可~即轮播图)
      // this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
    });
  }
}

//组件回到顶部的混入(滚动高度大于1千再显示)
import BackTop from "components/content/backTop/BackTop";

export const backMixin = {
  data(){
    return{
      isShowBack: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}
