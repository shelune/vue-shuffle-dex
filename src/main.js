// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

// OUTER WRAPPER STAGE //

Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */

const router = new VueRouter({
  routes: [
    {
      path: '/home/:stageId',
      name: 'home',
      component: App
    },
    {
      path: '*',
      component: App
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)

  next()
})

new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router: router
})

export {router}
