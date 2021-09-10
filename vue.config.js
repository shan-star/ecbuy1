//路径起别名，简化路径
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views':"@/views",
        'common':'@/common'
      }
    }
  }
}
