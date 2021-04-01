module.exports = {
  lintOnSave: false,

  //修改html-webpack-plugin的值 设置html的tab显示的title
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '华广活动管理系统'
      return args
    })
  },
  /**
   * 本地开发服务配置
   */
  devServer: {
    open: true,
    host: "localhost",
    // host: "http://act.liouer.top",
    // host: "http://www.liouer.top",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://www.liouer.top', // 接口的域名
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
          // '/': ''
        }
      }
    }
  }
};
