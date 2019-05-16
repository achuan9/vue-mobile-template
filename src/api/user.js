import request from '@/utils/request'

/**
 * 用户模块
 */

// 登录
export function login({ username, password }) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 注册
export function register({ username, password }) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
