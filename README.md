# 关于项目
本项目是一个移动端项目的模版。包括一些常用配置及工具等等，让我们能更快速的开始一个新项目。

# 模版内容

- [Vue](https://cn.vuejs.org/v2/guide/) 不知道是干嘛的
- [Vue-Router](https://router.vuejs.org/zh/) 路由
- [Vuex](https://vuex.vuejs.org/zh/) 状态管理
- [axios](https://github.com/axios/axios) 网络请求
- [NutUI](http://nutui.jd.com) 组件库
- [js-cookie](https://github.com/js-cookie/js-cookie#readme) cookie操作
- [js-md5](https://github.com/emn178/js-md5) md5加密
- [Mock.js](http://mockjs.com/) 数据模拟
- [sass](http://sass.bootcss.com/) css拓展
- [eslint](https://cn.eslint.org/) 代码风格
- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 适配
  
# 关于适配
如果你的设计稿也是 750x1330，那就直接在样式中以`px`单位写设计图的标注尺寸好了。打开控制台就可以发现你在项目中写的`px`单位转为了`vw`，这是因为用到了[PostCSS](https://postcss.org/)的插件[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)。你也可以根据设计稿修改 `.postcssrc.js` 文件中的 `postcss-px-to-viewport` 部分。


# 关于组件库

组件库采用的是来自[JDC- 前端开发部](https://jdc.jd.com/)的[NutUI](http://nutui.jd.com/#/index)。已经配置好 **按需引入、主题定制**，都是在`src/ui-library`目录下操作

## 如何修改组件库
1. 移除依赖： `yarn remove @nutui/nutui`
2. 将 `src/ui-library` 目录下具体代码改为你用到的组件库代码
3. 删除 `babel.config.js`文件中 `module.exports.plugins` 部分：
   ```javascript
   module.exports = {
     presets: ["@vue/app"]
   };
   ```
4. 修改`vue.config.js`，如果你对这些配置项不熟，请通过关键字搜索。
   ```javascript
   // 删除关于自定义主题的配置，结果是这样的：
     css: {
       loaderOptions: {
         sass: {
           data: `
           @import "~@/styles/variables.scss";
           @import "~@/styles/mixin.scss";
           `
         }
       }
     },
   // 删除将ui组件库单独打包的配置，如果你用到别的组件库可以将下面内容中的`@nutui`替换为你用到的组件库名：
   ui: {
           test: /[\\/]node_modules[\\/]_?@nutui(.*)/,
           name: 'vendor-ui',
           priority: 20
         },
   ```
