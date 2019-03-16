import Vue from 'vue'
import Router from 'vue-router'

import PageIndex from '../components/page-index'
import PageVisual from '../components/page-visual'
import Setting from '../components/page-setting'

Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'landing-page',
  //     component: require('@/components/LandingPage').default
  //   },
  //   {
  //     path: '*',
  //     redirect: '/'
  //   }
  // ]
  routes: [
    {
      path: '/',
      component: PageIndex,
    },
    {
      path: '/visual',
      meta: {
        keepAlive: true,
      },
      component: PageVisual,
    },
    {
      path: '/setting',
      compoennt: Setting
    }
  ]
})
