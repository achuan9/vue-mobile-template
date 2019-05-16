<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key"/>
  </transition>
</template>
<script type = 'text/javascript'>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang='scss' scoped>
/* fade */
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.1s;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
