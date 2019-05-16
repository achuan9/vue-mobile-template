const directive = require.context('./', false, /[^index]\.js$/) // 只获取第一层子目录的组件
const directives = {}
directive.keys().map(item => {
  const name = item.replace(/\.\/(\w+)\.js$/g, '$1')
  directives[name] = require(`${item}`).default
})
function install(Vue) {
  if (install.installed) {
    return
  }

  install.installed = true

  for (const key in directives) {
    if (directives.hasOwnProperty(key)) {
      Vue.directive(key, directives[key])
    }
  }
}
console.log(directives)

export default install
