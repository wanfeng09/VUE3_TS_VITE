import HLayout from '@/layout/HLayout.vue'
export default [
    {
      path: '/base',
      name: 'Base',
      component: HLayout,
      redirect: '/base/i18n',
      meta: { title: '拖拽',icon: 'StarFilled' },
      children: [
        {
          path: '/base/i18n',
          name: 'HI18nBase',
          component: () => import('@/views/base/HI18nBase.vue'),
          meta: { title: '国际化',icon: 'StarFilled'  }
        },
        {
            path: '/base/router',
            name: 'HRouterBase',
            component: () => import('@/views/base/HRouterBase.vue'),
            meta: { title: '路由基础',icon: 'StarFilled'  }
          },
      ]
    }
  ]