import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from "../components/Views/GoodsList";
import Cart from '../components/Views/Cart'
import Address from '../components/Views/Address'
import orderConfirm from '../components/Views/OrderConfirm'
import orderFinish from '../components/Views/orderFinish'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      name: 'GoodsList',
      component:GoodsList
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
      path:'/orderConfirm',
      name:'orderConfirm',
      component: orderConfirm
    },
    {
      path:'/orderFinish',
      name:'orderFinish',
      component: orderFinish
    }
  ]
})
