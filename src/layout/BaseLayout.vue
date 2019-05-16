<template>
  <div>
    <navbar/>
    <app-main/>
  </div>
</template>
<script type = 'text/javascript'>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'

export default {
  name: 'LayoutExport',
  components: { Navbar, AppMain }
}
</script>
<style lang='scss' scoped>
</style>
