const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/path/' : '/',
  productionSourceMap: false,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
       //向所有的sass文件注入 theme.scss
        data: `@import '~@/assets/style/theme.scss';`
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  },
  devServer: {
    port: 8081,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  }
}
