// 处理路由路径
export const filterAsyncRouter = (asyncRouterMap: any, type = false) => {
  return asyncRouterMap.filter((route: any) => {
    if (type && route.children) {
      route.children = filterChildren(route.children, route)
    }
    // 判断路由是否有子级children, 转换为组件对象
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}
/**
 *
 * @param childrenMap 第二级路由
 * @param lastRouter 是否还存在子集
 * @returns
 */
// 修改子级路径，进行拼接
export const filterChildren = (childrenMap: any, lastRouter: any) => {
  // level: 2
  let newChildren: any = []
  for (let i = 0; i < childrenMap.length; i++) {
    const item = childrenMap[i]
    if (item.children && item.children.length) {
      for (let j = 0; j < item.children.length; j++) {
        const element = item.children[j]
        // 拼接路径
        element.path = item.path + '/' + element.path
        if (element.children && element.children.length) {
          newChildren = newChildren.concat(filterChildren(element.children, element))
          return
        }
        newChildren.push(element)
      }
    } else {
      let str = lastRouter.path !== '/' ? '/' : ''
      item.path = lastRouter.path + str + item.path
    }
    newChildren = newChildren.concat(item)
  }
  return newChildren
}

// 处理隐藏路由
export const filterHiddenRoutes = (routes: any) => {
  return routes.filter((item: any) => {
    // 未定义，直接显示
    if (!item.meta) {
      return true
    }
    // 处理hidden:true
    if (item.meta && !item.meta.hidden) {
      if (item.children && item.children.length) {
        item.children = filterHiddenChildrenRoutes(item.children)
        return item
      } else {
        return item
      }
    }
  })
}
// 处理隐藏子级路由
export const filterHiddenChildrenRoutes = (childrenMap: any) => {
  return childrenMap.filter((item: any) => {
    if (item.meta && !item.meta.hidden) {
      if (item.children && item.children.length) {
        filterHiddenChildrenRoutes(item.children)
      } else {
        return item
      }
    }
  })
}

// 处理路由权限
// ...
