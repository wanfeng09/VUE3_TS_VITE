export default [
    {
      id: '1',
      name: 'Dashboard',
      path: '/',
      redirect: '/Dashboard',
      meta: {
        title: '首页',
        icon: 'ChatRound',
        roles: ['admin', 'editor'],
      },
    },
    {
      id: '2',
      name: 'Visual',
      path: '/visual',
      redirect: '/base/echarts',
      children: [
        {
          id: '2-1',
          path: '/visual/echarts',
          name: 'HEcharts',
          meta: { title: 'Echarts', icon: 'StarFilled' },
        },
        {
          id: '2-2',
          path: '/visual/gmap',
          name: 'GMap',
          meta: { title: '高德地图', icon: 'StarFilled' },
        },
        {
          id: '2-3',
          path: '/visual/long',
          name: 'Long',
          meta: { title: 'ThreeLong', icon: 'StarFilled' },
        },
      ],
    },
    {
        id: '3',
        path: '/base',
        name: 'Base',
        redirect: '/base/i18n',
        children: [
          {
            id: '3-1',
            path: '/base/i18n',
            name: 'HI18nBase',
            meta: { title: '国际化', icon: 'StarFilled' },
          },
          {
            id: '3-2',
            path: '/base/router',
            name: 'HRouterBase',
            meta: { title: '路由基础', icon: 'StarFilled' },
          }
        ],
      },
      {
        id: '4',
        path: "/error",
        name: "Error404",
        meta: {
          title: 'Error',
          icon: 'dashboard',
          roles: ['admin', 'editor'],
        },
      },
  ]