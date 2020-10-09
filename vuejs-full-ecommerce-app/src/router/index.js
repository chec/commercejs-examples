import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Products',
    component: () => import('../views/ProductLanding.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/order-confirmation',
    name: 'Order Confirmation',
    component: () => import('../views/Confirmation.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
