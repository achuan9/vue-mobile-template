import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getHomeData } from './home'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 200
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/getHomeData/, getHomeData)


export default Mock
