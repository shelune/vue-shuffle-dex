import {ApolloClient, createBatchingNetworkInterface} from 'apollo-client'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueApollo from 'vue-apollo'

import App from './App'
import CreateStage from './components/CreateStage'
import EditStage from './components/EditStage'
// OUTER WRAPPER STAGE //

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:1337/graphql',
  opts: {
    credentials: 'same-origin'
    // Pass headers here if your graphql server requires them
  }
})

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueApollo)
/* eslint-disable no-new */

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

const router = new VueRouter({
  routes: [
    {
      path: '/stage/:stageId',
      name: 'home',
      component: App
    },
    {
      path: '/create',
      name: 'create',
      component: CreateStage
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditStage
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
  apolloProvider,
  template: '<router-view></router-view>',
  router: router
})

export {router}
