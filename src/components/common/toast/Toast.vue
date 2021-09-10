<template>
  <div id="toast" v-show="isShowToast">
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      content: '默认文字',
      isShowToast: false
    }
  },
  methods: {
    showMessage(message, time = 500){
      this.content = message;
      // console.log(this.content);
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
        this.message = ''
      }, time)
    }

  }
  // props: {
  //   content: {
  //     type: String,
  //     default: '默认文字'
  //   }
  // }
}
</script>

<style scoped>
#toast {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: rgba(0, 0, 0, .7);
}
</style>
