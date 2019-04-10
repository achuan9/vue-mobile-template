const component = require.context('./', true, /\.vue$/)
let components = {};
component.keys().map(item => {

  let name = item.replace(/\.\/\w+\/(\w+)\.vue/g, '$1')
  components[name] = require(`${item}`).default;
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
