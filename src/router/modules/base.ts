import HLayout from '@/layout/HLayout.vue'
export default [
  {
    path: '/base',
    name: 'Base',
    component: HLayout,
    redirect: '/base/i18n',
    meta: { title: 'route.base', icon: 'HelpFilled', id: '5' },
    children: [
      {
        path: '/base/i18n',
        name: 'HI18nBase',
        component: () => import('@/views/base/HI18nBase.vue'),
        meta: { title: 'route.i18n', icon: 'Fries', id: '5' }
      },
      {
        path: '/base/icon',
        name: 'HIconBase',
        component: () => import('@/views/base/HIconBase.vue'),
        meta: { title: 'route.icon', icon: 'Grape', id: '5-1' }
      },
      {
        path: '/base/grammar',
        name: 'HGrammarBase',
        component: () => import('@/views/base/index.vue'),
        meta: { title: 'route.grammar', icon: 'Grape', id: '5-5' }
      },
      {
        path: '/base/router',
        name: 'HRouterBase',
        component: () => import('@/views/base/HRouterBase.vue'),
        meta: { title: 'route.rou', icon: 'AddLocation', id: '5-2' }
      },
      {
        path: '/base/drag',
        name: 'HDragBase',
        component: () => import('@/views/base/HDragBase.vue'),
        meta: { title: 'route.drag', icon: 'IceCream', id: '5-3' }
      },
      {
        path: '/base/echarts',
        name: 'HEchartsBase',
        component: () => import('@/views/base/HEchartsBase.vue'),
        meta: { title: 'route.echarts', icon: 'Orange', id: '5-4' }
      }
    ]
  }
]
