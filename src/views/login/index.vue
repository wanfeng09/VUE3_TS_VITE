<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { User, Lock, ChatLineSquare } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useConfigStore } from '@/stores/index'
import router from '@/router'
import { getCaptchaImage, login } from '@/api/login'

const store = useConfigStore()
const bg = computed(() => store.themeColor)
const fontColor = computed(() => store.fontColor)
console.log(bg.value, fontColor.value)
interface LoginReq {
  username: string
  password: string
  code: string
  uuid: string
}
const loadingBtn = ref(false)
const codeUrl = ref('')
// 验证码开关
const captchaEnabled = ref(true)
const loginParam: LoginReq = reactive({
  username: 'admin',
  password: '123456',
  code: '',
  uuid: ''
})
const loginRef = ref<FormInstance>()
const loginRules: FormRules = reactive({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

// 获取验证码
const getCode = async () => {
  const res: any = await getCaptchaImage()
  captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + res.img
    loginParam.uuid = res.uuid
  }
}
// 执行
getCode()

// 提交登录
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loadingBtn.value = true
      login(loginParam)
        .then((res: any) => {
          loadingBtn.value = false
          store.setLoginName(loginParam.username, res.token)
          router.push('/')
        })
        .catch((err) => {
          console.log('登录接口请求失败', err)
          loadingBtn.value = false
          if (captchaEnabled.value) {
            getCode()
          }
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <div class="login">
    <el-form class="login-form" ref="loginRef" :model="loginParam" :rules="loginRules">
      <div class="login-title">{{ $t('login.title') }}</div>
      <el-form-item prop="username">
        <el-input
          :placeholder="$t('login.accountTip')"
          :prefix-icon="User"
          v-model="loginParam.username"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :placeholder="$t('login.passwordTip')"
          show-password
          :prefix-icon="Lock"
          v-model="loginParam.password"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <div class="flex flex-row justify-between flex-1">
          <el-input
            class="flex-1 mr-2"
            :placeholder="$t('login.codeTip')"
            :prefix-icon="ChatLineSquare"
            v-model="loginParam.code"
            size="large"
          ></el-input>
          <el-image style="width: 100px" :src="codeUrl" fit="contain" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          size="large"
          :loading="loadingBtn"
          @click="submit(loginRef)"
          >{{ $t('login.loginBth') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(@/assets/svgs/login-bg.svg) 100% no-repeat;
  background-size: cover;
  background-position: left bottom;
  box-sizing: border-box;
  display: flex;
  &-title {
    text-align: center;
    font-size: 26px;
    padding: 0 0 30px 0;
  }
  &-btn {
    width: 100%;
    font-size: 18px;
  }
  &-form {
    margin: auto;
    width: 420px;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid var(--el-border-color);
    border-radius: 15px;
  }
}
</style>
