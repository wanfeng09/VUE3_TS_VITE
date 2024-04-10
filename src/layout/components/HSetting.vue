<script lang="ts" setup>
import { useLayoutStore } from '@/store'
defineOptions({
  name: 'HSetting'
})
const store = useLayoutStore()
const drawer = ref(false)

enum controls {
  'theme', // 主题色 0
  'fontColor', // 字体颜色 1
  'sidebarBg',
  'sidebarText',
  'sidebarActiveText',
  'tags'
}

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

// 颜色更新
function update(evt: string, num: number) {
  if (evt) {
    useLayoutStore().updateColors(evt, num)
  }
}
</script>
<template>
  <div>
    <div @click="drawer = true" style="padding: 0 10px">
      <svg-icon iconClass="setting"></svg-icon>
    </div>
    <el-drawer v-model="drawer" :title="$t('navbar.systemSetting')" :with-header="true" size="20%">
      <el-row justify="end">
        <el-button
          style="text-align: right"
          type="primary"
          size="default"
          @click="store.resetStore"
        >
          重置
        </el-button>
      </el-row>

      <el-divider>{{ $t('navbar.globalConfig') }}</el-divider>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.themeColor') }}</el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="store.themeColor"
            show-alpha
            :predefine="predefineColors"
            @change="update($event, controls.theme)"
          />
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.fontColor') }}</el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="store.fontColor"
            show-alpha
            :predefine="predefineColors"
            @change="update($event, controls.fontColor)"
          />
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.openTags') }}</el-col>
        <el-col :span="4">
          <el-switch v-model="store.ifTags" />
        </el-col>
      </el-row>
      <el-divider>{{ $t('navbar.leftNav') }}</el-divider>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.bgColor') }}</el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="store.sidebarBgColor"
            show-alpha
            :predefine="predefineColors"
            @change="update($event, controls.sidebarBg)"
          />
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.fontColor') }}</el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="store.sidebarFontColor"
            show-alpha
            :predefine="predefineColors"
            @change="update($event, controls.sidebarText)"
          />
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col class="h-text" :span="18">{{ $t('navbar.activeFontColor') }}</el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="store.sidebarActiveColor"
            show-alpha
            :predefine="predefineColors"
            @change="update($event, controls.sidebarActiveText)"
          />
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@include s(text) {
  font-size: 14px;
  color: var(--el-text-color-primary);
}
</style>
