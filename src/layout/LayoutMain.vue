<template>
  <div class="app-wrapper" >
    <nav-bar></nav-bar>
    
    <div class="main-container">
      <side-bar class="sidebar-container"></side-bar>
      <!-- <nav-path/> -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import NavPath from './components/NavPath';
import SideBar from './components/SideBar';
import AppMain from './components/AppMain';

export default {
  name: 'layout',
  components: {
    NavBar,
    NavPath,
    SideBar,
    AppMain,
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  min-height: 100vh;
  transition: margin-left 0.28s;
  margin-left: $sidebar-width;
  background-color: #fff;
}
</style>
