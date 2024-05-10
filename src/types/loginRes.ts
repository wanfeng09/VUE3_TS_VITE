export interface LoginRes {
  code: number
  token: string
  msg: string
}

export interface CodeImg {
  msg: string
  img: string
  code: number
  captchaEnabled: boolean
  uuid: string
}

export interface UserInfoRes {
  code: number
  msg: string
  permissions: string[]
  roles: string[]
  user: {
    admin: boolean
    avatar: string
    createBy: string
    createTime: string
    delFlag: string
    remark: string
    phonenumber: string
    loginIp: string
    nickName: string
    userName: string
    // ...
  }
}
