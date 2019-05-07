import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Goods from "../pages/Goods/goods";
import Ratings from "../pages/Ratings/ratings";
import Seller from "../pages/Seller/seller";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{
        name: 'Goods'
      }
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
  ]
})
