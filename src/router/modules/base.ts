import HLayout from '@/layout/HLayout.vue'
export default [
    {
      path: '/base',
      name: 'Base',
      component: HLayout,
      redirect: '/base/i18n',
      meta: { title: "route.base",icon: 'HelpFilled',id: "5" },
      children: [
        {
          path: '/base/i18n',
          name: 'HI18nBase',
          component: () => import('@/views/base/HI18nBase.vue'),
          meta: { title: 'route.i18n',icon: 'Flag' ,id: "5" }
        },
        {
            path: '/base/router',
            name: 'HRouterBase',
            component: () => import('@/views/base/HRouterBase.vue'),
            meta: { title: 'route.rou',icon: 'LocationFilled' ,id: "5-2" }
          },
          {
            path: '/base/drag',
            name: 'HDragBase',
            component: () => import('@/views/base/HDragBase.vue'),
            meta: { title: 'route.drag',icon: 'Grid' ,id: "5-3" }
          },
      ]
    }
  ]