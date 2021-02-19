import Vue from 'vue'
import Router from 'vue-router'
import movie from '@/page/movie'
import myinfo from '@/page/myinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      name: 'movie',
      component: movie
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: myinfo
    }
  ]
})
