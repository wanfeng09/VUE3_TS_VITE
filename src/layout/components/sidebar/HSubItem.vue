<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import type { PropType } from 'vue'
import type { IMenuItem } from '@/types/layout/index'
import DynamicIcon from '@/components/DynamicIcon/DynamicIcon.vue'
defineOptions({
  name: 'HSubItem'
})

defineProps({
  menuList: {
    type: Array as PropType<IMenuItem[]>,
    default: () => []
  }
})

const route = useRoute()
const router = useRouter()

const handleSelect = (item: IMenuItem) => {
  if (item.path === route.path) return
  router.push(item.path!)
}
</script>
<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item
      v-if="!item.children || item.children.length <= 1"
      :index="item.meta.id"
      @click="handleSelect(item)"
    >
      <el-icon v-if="item.meta.icon">
        <dynamic-icon :name="item.meta.icon" />
      </el-icon>
      <template #title>{{ $t(item.meta.title) }}</template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.name!">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <dynamic-icon :name="item.meta.icon" />
        </el-icon>
        <span>{{ $t(item.meta.title) }}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <h-sub-item :menu-list="item.children" />
    </el-sub-menu>
  </template>
</template>
