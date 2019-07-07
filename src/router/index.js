import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/Views/GoodList'
import Cart from '@/Views/Cart'
import Address from '../Views/Address'
import orderConfirm from '../Views/orderConfirm'
import orderSuccess from '../Views/orderSuccess'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }
  ]
})
