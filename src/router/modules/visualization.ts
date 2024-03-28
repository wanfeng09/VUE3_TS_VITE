import HLayout from '@/layout/HLayout.vue'
export default [
    {
      path: '/visual',
      name: 'Visual',
      component: HLayout,
      redirect: '/visual/echarts',
      meta: { title: 'route.visual',icon: 'Platform' ,id: "6"},
      children: [
        {
          path: '/visual/echarts',
          name: 'HEcharts',
          component: () => import('@/views/visualization/HEcharts.vue'),
          meta: { title: 'route.echarts',icon: 'Histogram' ,id: "6" }
        },
        {
            path: '/visual/gmap',
            name: 'GMap',
            component: () => import('@/views/visualization/HGMap.vue'),
            meta: { title: 'route.gmap',icon: 'Promotion' ,id: "6-2" }
          },
          {
            path: '/visual/long',
            name: 'Long',
            component: () => import('@/views/visualization/HLong.vue'),
            meta: { title: 'route.long',icon: 'Opportunity' ,id: "6-3" }
          },
          {
            path: '/visual/square',
            name: 'Square',
            component: () => import('@/views/visualization/H3D.vue'),
            meta: { title: 'route.square',icon: 'TrendCharts'  ,id: "6-4"}
          },
          {
            path: '/visual/layers',
            name: 'Layers',
            component: () => import('@/views/visualization/HLayers.vue'),
            meta: { title: 'route.layers',icon: 'HelpFilled' ,id: "6-5" }
          },
      ]
    }
  ]