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
    port: 8080,
    // autoOpenBrowser: true,
    // assetsSubDirectory: 'static',
    // headers: {
    //   'X-Custom-Foo': 'bar',
    //   // 'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //   'Access-Control-Allow-Headers':
    //     'X-Requested-With, content-type,' + ' Authorization'
    // },
    proxy: {
      '/api': {
        target: 'http://www.liouer.top', // 接口的域名
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
        // headers: {
        //   Cookie:
        //     'oauth2_authentication_csrf=MTYwNTE3Njk2N3xEdi1CQkFFQ180SUFBUkFCRUFBQVB2LUNBQUVHYzNSeWFXNW5EQVlBQkdOemNtWUdjM1J5YVc1bkRDSUFJREZrTldWallqbGlObUl3WVRRMk0yRTVPV00wTUdWaE1XRXlaVFpsTW1Ga3xRFYpuzFQyyZHVzqDYxBeSmEwIWyoaYl62UWD5PT2jnA==; storecode=6092bbed-fff7-4c46-ad31-8898000a4c25; dgd_wwlid=3fdef13f729eb175e0b176c5c1d969ec82c08; JSESSIONID=34a919933c996175e0b176c5838e83de139fb; LTPATOKEN=f22e864dd816a175e0b176c50bcd12befc527; SESSIONID2=3fdef13f729eb175e0b176c5c1d969ec82c08; temp=3fdef13f729eb175e0b176c5c1d969ec82c08; loginToken=eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiOTY0ZmVlNzctMDVlNy00ZWEwLWFmNTEtZmZmOGY3OGY5ZmJiIn0.kiaOmJmQcy5bMSh-VVSTtJfhDV00om7DBZ_W4cxDNwQ'
        // }
      }
    }
  }
};
