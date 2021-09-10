<template>
  <div class="good-list-item" @click="goodItemClick">
    <img :src="goodsSrc" alt="" @load="goodImgLoad"/>
    <div class="good-info">
      <div class="title">{{goodItem.title}}</div>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  computed: {
    goodsSrc(){
      return  this.goodItem.image || this.goodItem.show.img
    }
  },
  props: {
    //商品信息title、cafv（收藏）、price
    goodItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    goodImgLoad(){
      this.$bus.$emit('goodImageLoad');
    },
    goodItemClick(){
      //获取当前商品的iid,将参数变量进行拼接：+ this.goodsItem.iid  this.$router.push('/detail/' + this.goodsItem.iid);
      const iid = this.goodItem.iid;
      this.$router.push('/detail/' + iid);
    }
  }
}
</script>

<style scoped>
.good-list-item{
  /*flex: 1;*/
  width: 48%;
  box-sizing: border-box;
  padding: 0 10px;
}
img{
  width: 100%;
}
.good-info {
  font-size: 12px;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
}

.good-info .title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.good-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.good-info .collect {
  position: relative;
}

.good-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
