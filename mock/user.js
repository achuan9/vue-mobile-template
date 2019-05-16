const users = {
  admin: {
    password: '123456',
    token: 'admin-token'
  }
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const info = users[username]
      if (!info) {
        return {
          code: 1005,
          message: '用户不存在'
        }
      }
      if (password !== info) {
        return {
          code: 1006,
          message: '用户名或密码错误'
        }
      }
      return {
        code: 1000,
        data: info
      }
    }
  },

  {
    url: '/user/register',
    type: 'post',
    response: ({ body }) => {
      const { username, password } = body
      users[username] = {
        password,
        token: `${username}-token`
      }
      return {
        code: 1000,
        message: '注册成功'
      }
    }
  }
]
