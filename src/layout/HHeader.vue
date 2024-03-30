<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoginStore, useLayoutStore } from '@/store/index'
import { useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const store = useLoginStore()
const layoutStore = useLayoutStore()
const avatarUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
function languageChange() {
  if (locale.value === 'zh') {
    locale.value = 'en'
  } else {
    locale.value = 'zh'
  }
}

function logout() {
  store.setLoginName('')
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div class="h-header h-header__flex h-header--between">
    <div class="h-header__left h-header__flex">
      <div style="padding: 0 10px 0 0">
        <el-icon :size="26" v-if="layoutStore.isCollapse" @click="layoutStore.updateCollapse(false)"
          ><i-ep-Expand
        /></el-icon>
        <el-icon :size="26" v-else @click="layoutStore.updateCollapse(true)"><i-ep-Fold /></el-icon>
      </div>
      <div>{{ route.name }}</div>
    </div>

    <div class="h-header__right h-header__flex">
      <div style="padding: 0 20px" @click="languageChange">
        <svg-icon v-if="locale === 'en'" icon-class="en" class-name="iconfont" />
        <svg-icon v-else icon-class="zh" class-name="iconfont" />
      </div>
      <el-dropdown ref="dropdownRef">
        <span class="el-dropdown-link">
          <div class="h-header__flex">
            <el-avatar :size="40" :src="avatarUrl" />
            <div style="padding: 0 10px">{{ store.username }}</div>
            <el-icon><i-ep-CaretBottom /></el-icon>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>  -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-dropdown {
  color: #fff;
}
.el-tooltip__trigger:focus-visible {
  outline: none;
}

@mixin flex {
  display: flex;
  align-items: center;
  flex-direction: row;
}

@include s(header) {
  height: 60px;
  padding: 0 20px;
  @include ds(flex) {
    @include flex;
  }
  @include ds(left) {
    flex: 1;
  }
  @include ds(right) {
    flex: 1;
    justify-content: end;
  }
  @include dd(between) {
    justify-content: space-between;
  }
}
</style>
