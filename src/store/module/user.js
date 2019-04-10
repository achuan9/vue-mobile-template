
import {
  login,
  logout,
  getUserInfo
}
from '@/http/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatar: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatar = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          commit('setToken', res.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(res => {
          commit('setToken', "")
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvatar', data.avatar)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }
        catch (error) {
          reject(error)
        }
      })
    },
  }
}
