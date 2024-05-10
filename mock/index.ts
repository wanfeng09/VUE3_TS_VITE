export default [
  {
    method: 'get',
    url: '/captchaImage',
    response: () => {
      // body: 请求体
      return {
        code: 200,
        img: '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',
        captchaEnabled: true,
        uuid: 'bb3986a547f94702aacf3637295b1758',
        msg: '验证码成功'
      }
    }
  },
  {
    method: 'post',
    url: '/login',
    response: () => {
      // body: 请求体
      return {
        code: 200,
        token: 'token123',
        msg: '登录成功'
      }
    }
  },
  {
    method: 'get',
    url: '/getInfo',
    response: () => {
      return {
        code: 200,
        msg: '获取成功',
        roles: ['admin'],
        user: {
          admin: true,
          avatar: '',
          userName: 'admin'
        }
      }
    }
  },
  {
    method: 'get',
    url: '/getRouters',
    response: () => {
      return {
        code: 200,
        msg: '登录成功',
        data: {}
      }
    }
  }
]
