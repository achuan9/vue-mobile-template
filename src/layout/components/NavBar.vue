<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo">
      <img src="../images/logo.png">
    </div>
    <div class="user-profile-container" trigger="click">
      <div class="user-profile-content">
        <el-dropdown>
          <div class="user-profile-body">
            <img class="user-avatar" :src="avatar">
            <span class="user-name">{{userName}}</span>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                个人设置
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { headerToggleConfig } from '@/router/menuConfig';
  export default {
    name: 'NavBar',
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        userName: store => store.user.userName,
        avatar: store => store.user.avatar,
      }),
      toggleNav() {
        const isFirstToggle = (this.$route.fullPath === headerToggleConfig[0].path);
        const curIndex = isFirstToggle ? 1 : 0;
        return headerToggleConfig[curIndex];
      }
    },
    methods: {
      ...mapActions(['handleLogOut']),
      async logout() {
        await this.handleLogOut();
        this.$router.replace('login')

      }
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: $navbar-height;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .logo {
      display: inline-block;
      height: $navbar-height;
      text-align: left;
      overflow: hidden;
      img {
        width: $sidebar-width;
        height: $navbar-height;
      }
    }

    .user-profile-container {
      position: absolute;
      top: 0;
      right: 20px;
      height: 100%;
      cursor: pointer;

      .user-profile-content {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .user-toggle-nav {
        padding: 0 12px;
        font-size: 14px;
        text-decoration: underline;
        &:hover {
          color: $theme;
        }
      }

      .user-profile-body {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-right: 14px;
      }

      .user-avatar {
        width: 24px;
        height: 24px;
        margin: 0 8px 0 12px;
        border-radius: 4px;
      }

      .user-name {
        color: rgba(0, 0, 0, .65);
      }

      .user-department {
        font-size: 12px;
        color: rgba(102, 102, 102, 0.65);
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: 0;
        top: 13px;
        font-size: 12px;
      }
    }
  }
</style>
