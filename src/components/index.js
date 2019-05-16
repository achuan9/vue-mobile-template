const component = require.context('./', true, /^\.\/\w+\/\w+\.vue$/) // 只获取第一层子目录的组件
const components = {}
component.keys().map(item => {
  const name = item.replace(/\.\/\w+\/(\w+)\.vue/g, '$1')
  components[name] = require(`${item}`).default
})
function install(Vue) {
  if (install.installed) {
    return
  }

  install.installed = true

  for (const key in components) {
    if (components.hasOwnProperty(key)) {
      Vue.component(key, components[key])
    }
  }
}

export default install
