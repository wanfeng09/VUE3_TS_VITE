import request from '@/utils/request'

// --验证码操作处理（1）--
// 生成验证码
export const getCaptchaImage = () => {
  return request.get('/captchaImage')
}

// --登录验证（3）--
// 登录方法
export const login = <T>(data: T) => {
  return request.post('/login', data)
}

// 获取用户信息
export const getInfo = () => {
  return request.get('/getInfo')
}

// 获取路由信息
export const getRouters = () => {
  return request.get('/getRouters')
}
