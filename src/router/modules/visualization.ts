import HLayout from '@/layout/HLayout.vue'
export default [
    {
      path: '/visual',
      name: 'Visual',
      component: HLayout,
      redirect: '/base/i18n',
      meta: { title: '拖拽',icon: 'StarFilled' },
      children: [
        {
          path: '/visual/echarts',
          name: 'HEcharts',
          component: () => import('@/views/visualization/HEcharts.vue'),
          meta: { title: 'Echarts',icon: 'StarFilled'  }
        },
        {
            path: '/visual/gmap',
            name: 'GMap',
            component: () => import('@/views/visualization/HGMap.vue'),
            meta: { title: '高德地图',icon: 'StarFilled'  }
          },
          {
            path: '/visual/long',
            name: 'Long',
            component: () => import('@/views/visualization/HLong.vue'),
            meta: { title: 'ThreeLong',icon: 'StarFilled'  }
          },
      ]
    }
  ]