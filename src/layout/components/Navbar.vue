<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-left">
        <slot name="left"/>
      </div>
      <div class="top-bar-right">
        <span>{{ userInfo.username }}，</span>
        <span class="btn-logout" @click="logout">退出</span>
      </div>
    </div>
  </div>
</template>
<script type = 'text/javascript'>
import { mapState } from 'vuex'

export default {
  name: 'BaseLayout',
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
<style lang='scss' scoped>
.top-bar {
  display: flex;
  height: 80px;
  line-height: 80px;
  color: $blue;
  background: $gray;
  &-left {
    flex: 1;
    text-align: left;
  }
  &-right {
    flex: 1;
    text-align: right;
    .btn-logout {
      padding-right: 34px;
    }
  }
}
</style>
