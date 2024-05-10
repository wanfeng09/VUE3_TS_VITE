<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import type { PropType } from 'vue'
import type { AppRouteRecordRaw } from '@/types/index'
import DynamicIcon from '@/components/DynamicIcon/DynamicIcon.vue'
defineOptions({
  name: 'sidebarItem'
})

defineProps({
  menuList: {
    type: Array as PropType<AppRouteRecordRaw[]>,
    default: () => []
  }
})

const route = useRoute()
const router = useRouter()

const handleSelect = (item: AppRouteRecordRaw) => {
  // console.log(item)
  if (item.name === route.name) return
  // 只有一个子菜单
  if (item.children?.length === 1) {
    router.push(item.children[0].path)
  } else {
    router.push(item.path)
  }
}
</script>
<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item
      v-if="!item.children || item.children.length <= 1"
      :index="item.children && item.children.length ? item.children[0].path : item.path"
      @click="handleSelect(item)"
    >
      <el-icon v-if="item.children ? item.children[0].meta?.icon : item.meta?.icon">
        <dynamic-icon :name="item.children ? item.children[0].meta?.icon : item.meta?.icon" />
      </el-icon>
      <template #title>
        {{
          item.children
            ? $t(item.children[0].meta?.title ?? 'langErr')
            : $t(item.meta?.title ?? 'langErr')
        }}
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <dynamic-icon :name="item.meta.icon" />
        </el-icon>
        <span>{{ $t(item.meta?.title ?? 'langErr') }}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <sidebarItem :menu-list="item.children" />
    </el-sub-menu>
  </template>
</template>
