'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9999 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0', // 解决手机局域网访问不会自动刷新
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true
      }
    },
    after: require('./mock/index.js')
  },
  configureWebpack: {
    resolve: {
      alias: { // 别名，例如在项目中  import foo from '@/components/foo' , 就是引入的 'src/components/foo'
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "~@/styles/variables.scss";
        @import "~@/styles/mixin.scss";
        @import "~@/ui-library/theme.scss";
        @import "@nutui/nutui/dist/styles/mixins/index.scss";
        `
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // config
    //   // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === 'development', config =>
    //     config.devtool('cheap-source-map')
    //   )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
            name: 'vendor-vue',
            priority: 20, // 权重要大于上面的chunk-libs
            chunks: 'all'
          },
          ui: {
            test: /[\\/]node_modules[\\/]_?@nutui(.*)/, // in order to adapt to cnpm
            name: 'vendor-ui',
            priority: 20 // 权重要大于上面的chunk-libs
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  分割前必须共享模块的最小块数。
            priority: 5,
            reuseExistingChunk: true // 如果当前块包含已从主束拆分的模块，则将重用它而不是生成新的块。这可能会影响块的结果文件名。
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
