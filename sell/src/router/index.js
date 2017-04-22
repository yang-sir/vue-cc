import Vue from 'vue';
import Router from 'vue-router';
import Goods from '../components/goods/goods';
import Seller from '../components/seller/seller';
import Ratings from '../components/ratings/ratings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]
});
