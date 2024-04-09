<template>
  <ElForm class="login-form" ref="loginRef" :model="loginParam" :rules="loginRules">
    <div class="login-title">登录</div>
    <ElFormItem prop="username">
      <ElInput
        placeholder="请输入账号"
        :prefix-icon="User"
        v-model="loginParam.username"
        size="large"
      ></ElInput>
    </ElFormItem>
    <ElFormItem prop="password">
      <ElInput
        placeholder="请输入密码"
        show-password
        :prefix-icon="Lock"
        v-model="loginParam.password"
        size="large"
      ></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" class="login-btn" size="large" @click="submit(loginRef)"
        >登录</ElButton
      >
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/index'
interface LoginReq {
  username: string
  password: string
}

const loginParam: LoginReq = reactive({
  username: 'admin',
  password: '123456'
})
const router = useRouter()

const loginRef = ref<FormInstance>()
const loginRules: FormRules = reactive({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return false
  }
  formEl.validate(async (validate: boolean) => {
    if (validate) {
      useLoginStore().setLoginName(loginParam.username, 'token')
      router.push('/')
    } else {
      return false
    }
  })
}
</script>

<style scoped>
.login-form {
  width: 420px;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid var(--el-border-color);
  border-radius: 15px;
}
.login-title {
  text-align: center;
  font-size: 26px;
  padding: 0 0 30px 0;
}
.login-btn {
  width: 100%;
  font-size: 18px;
}
</style>
