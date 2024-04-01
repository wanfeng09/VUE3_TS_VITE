<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoginStore, useLayoutStore } from '@/store/index'
import { useRouter } from 'vue-router'
const route = useRoute()
// console.log("route",route.matched);
const router = useRouter()
const { locale } = useI18n()
const store = useLoginStore()
const layoutStore = useLayoutStore()
const avatarUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

// 语言切换
function languageChange() {
  if (locale.value === 'zh') {
    locale.value = 'en'
  } else {
    locale.value = 'zh'
  }
}
// start: 面包屑
let levelList = ref<{ path: string; redirect: string; meta: { title: string } }[]>([])
watch(
  route,
  () => {
    levelList.value = []
    getBreadcrumb()
  },
  { immediate: true }
)
function getBreadcrumb() {
  levelList.value.push({
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: 'route.home'
    }
  })
  if (route.name !== 'Dashboard') {
    route.matched.map((ele) => {
      let str = ele.redirect ?? 'noRedirect'
      if (!ele.meta.hasOnlyChildren) {
        levelList.value.push({
          path: ele.path,
          redirect: str as string,
          meta: {
            title: ele.meta.title as string
          }
        })
      }
    })
  }
}

function handleLink(item: { path: string; redirect: string; meta: { title: string } }) {
  if (item.redirect !== 'noRedirect') {
    router.push(item.path)
  }
}
// end

// 退出登录
function logout() {
  store.logout()
  router.push('/login')
}
</script>

<template>
  <div class="h-header h-header__flex h-header--between">
    <div class="h-header__left h-header__flex">
      <div style="padding: 0 10px 0 0; display: flex; align-items: center">
        <el-icon :size="26" v-if="layoutStore.isCollapse" @click="layoutStore.updateCollapse(false)"
          ><i-ep-Expand
        /></el-icon>
        <el-icon :size="26" v-else @click="layoutStore.updateCollapse(true)"><i-ep-Fold /></el-icon>
      </div>
      <div>
        <!-- {{ route.name }} -->
        <el-breadcrumb :separator-icon="ArrowRight">
          <TransitionGroup name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path"
              ><span
                v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                style="color: #fff"
              >
                {{ $t(item.meta.title) }}
              </span>
              <a v-else style="color: #fff" @click="handleLink(item)">
                {{ $t(item.meta.title) }}
              </a>
            </el-breadcrumb-item>
          </TransitionGroup>
        </el-breadcrumb>
      </div>
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
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
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
