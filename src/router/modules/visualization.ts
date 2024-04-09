import HLayout from '@/layout/HLayout.vue'
export default {
  path: '/visual',
  name: 'Visual',
  component: HLayout,
  redirect: 'noRedirect',
  meta: { title: 'route.visual', icon: 'Platform', roles: ['admin'] },
  children: [
    {
      path: '/visual/echarts',
      name: 'HEcharts',
      component: () => import('@/views/visualization/HEcharts.vue'),
      meta: { title: 'route.echarts', icon: 'Histogram' }
    },
    {
      path: '/visual/gmap',
      name: 'GMap',
      component: () => import('@/views/visualization/HGMap.vue'),
      meta: { title: 'route.gmap', icon: 'Promotion' }
    },
    {
      path: '/visual/long',
      name: 'Long',
      component: () => import('@/views/visualization/HLong.vue'),
      meta: { title: 'route.long', icon: 'Opportunity' }
    },
    {
      path: '/visual/square',
      name: 'Square',
      component: () => import('@/views/visualization/H3D.vue'),
      meta: { title: 'route.square', icon: 'TrendCharts' }
    },
    {
      path: '/visual/layers',
      name: 'Layers',
      component: () => import('@/views/visualization/HLayers.vue'),
      meta: { title: 'route.layers', icon: 'HelpFilled' }
    }
  ]
}
