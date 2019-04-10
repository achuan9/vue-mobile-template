<template>
  <div class="page-path">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="item.path" v-for='(item, index) in navPath' :key='index'>{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script type = 'text/javascript'>
import routerConfig from "@/router/routerConfig";
  export default {
    name: 'NavPath',
    data() {
      return {

      }
    },
    computed: {
      navPath() {
        const matchRouterConf = routerConfig.find(item => item.path === this.$route.path) || [];
        return matchRouterConf.navPath
      }
    },
    created() {


    },
    methods: {

    },
  }
</script>
<style lang='scss' scoped>
  .page-path {
    padding: 10px;
    background: #f0f2f5;
  }
</style>
