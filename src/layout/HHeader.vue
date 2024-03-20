<script setup lang="ts">
import { Expand, Fold, CaretBottom } from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from "vue-i18n"
const route = useRoute()
const { locale } = useI18n()
let collapse = ref(true)
const avatarUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
function languageChange(){
  if(locale.value === 'zh'){
    locale.value = 'en'
  }else{
    locale.value = 'zh'
  }
}
</script>

<template>
  <div class="h-header h-header__flex h-header--between">
    <div class="h-header__left h-header__flex">
      <div >
        <el-icon :size="26" v-if="collapse"><Expand /></el-icon>
        <el-icon :size="26" v-else><Fold /></el-icon>
      </div>
      <div class="h-header__text">{{ route.name }}
      </div>
    </div>
    
    <div class="h-header__right h-header__flex" >
      <div style="padding: 0 20px;" @click="languageChange">
        <svg-icon v-if="locale === 'en'" icon-class="en" class-name="iconfont" />
        <svg-icon v-else icon-class="zh" class-name="iconfont" />
      </div>
      <el-dropdown ref="dropdownRef">
        <span class="el-dropdown-link">
          <el-avatar :size="40" :src="avatarUrl" />
          <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.el-dropdown{
    color: #fff;
}
.el-tooltip__trigger:focus-visible{
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
  @include ds(text) {
    padding-left: 10px;
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
