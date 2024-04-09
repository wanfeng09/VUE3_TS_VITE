import HLayout from '@/layout/HLayout.vue'
export default {
  path: '/base',
  name: 'Base',
  component: HLayout,
  redirect: 'noRedirect',
  meta: { title: 'route.base', icon: 'HelpFilled', roles: ['edit'] },
  children: [
    {
      path: '/base/i18n',
      name: 'HI18nBase',
      component: () => import('@/views/base/HI18nBase.vue'),
      meta: { title: 'route.i18n', icon: 'Fries' }
    },
    {
      path: '/base/icon',
      name: 'HIconBase',
      component: () => import('@/views/base/HIconBase.vue'),
      meta: { title: 'route.icon', icon: 'Grape' }
    },
    {
      path: '/base/grammar',
      name: 'HGrammarBase',
      component: () => import('@/views/base/TypeDeclaration.vue'),
      meta: { title: 'route.grammar', icon: 'Grape' }
    },
    {
      path: '/base/router',
      name: 'HRouterBase',
      component: () => import('@/views/base/HRouterBase.vue'),
      meta: { title: 'route.rou', icon: 'AddLocation' }
    },
    {
      path: '/base/drag',
      name: 'HDragBase',
      component: () => import('@/views/base/HDragBase.vue'),
      meta: { title: 'route.drag', icon: 'IceCream' }
    },
    {
      path: '/base/echarts',
      name: 'HEchartsBase',
      component: () => import('@/views/base/HEchartsBase.vue'),
      meta: { title: 'route.echarts', icon: 'Orange' }
    }
  ]
}
