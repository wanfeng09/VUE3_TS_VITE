import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
/**
 * @description: RouteMeta
 * @param {string} title 标题
 * @param {string} icon 图标
 * @param {string[]} roles 角色
 * @param {boolean} hidden 是否隐藏
 * @param {boolean} hasOnlyChildren 是否只包含子路由
 * @param {boolean} affix 标签是否固定
 *
 */
interface RouteMeta {
  title: string
  icon: string
  roles?: string[]
  hidden?: boolean
  hasOnlyChildren?: boolean
  affix?: boolean
}
/**
 * Omit<T, K> 是一个内置的类型操作符，它用于从类型 T 中剔除指定的键 K，创建一个新的类型，其中不包含 K 键。
 * @param {string} fullPath 全路径
 * @param {RouteMeta} meta 重置meta类型
 * @param {AppRouteRecordRaw} children 重置children类型
 */
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  fullPath?: string
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}
export interface RouteInterface {
  path: string
  name: RouteRecordName | null | undefined
  fullPath: string
  meta: RouteMeta
}
