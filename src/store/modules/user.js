import { login } from '@/api/user'
import router from '@/router'
import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/user'

const state = {
  info: getUserInfo()
}

const mutations = {
  SET_INFO: (state, info) => {
    state.info = { ...info }
  }
}

const actions = {
  // user login
  login({ commit }, req) {
    return new Promise((resolve, reject) => {
      login(req).then(response => {
        const { operatorId, username, nickname, phone } = response.data
        const obj = { operatorId, username, nickname, phone }
        commit('SET_INFO', obj)
        setUserInfo(obj)
        router.replace('/')
        resolve()
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_INFO', {})
    removeUserInfo()
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
