const files = require.context('./', true, /\.js$/)
let filters = {};
files.keys().map(item => {
  let name = item.replace(/\.\/(\w+)\.js/g, '$1')
  filters[name] = require(`${item}`).default;
})
export default filters