import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
/*
 * modlues 是vuex 对state 的模块化管理，便于代码的组装而不是所有的state都堆在一起
 */
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
