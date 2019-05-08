import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Goods from "../components/Goods/goods";
import Ratings from "../components/Ratings/ratings";
import Seller from "../components/Seller/seller";

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
