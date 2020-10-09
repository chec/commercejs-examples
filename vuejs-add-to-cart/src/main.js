import Vue from "vue";
import VueRouter from "vue-router";
import Commerce from "@chec/commerce.js";

import App from "./App.vue";
import CartPage from "./pages/CartPage.vue";
import ProductViewPage from "./pages/ProductViewPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

// Pass in your own API key to list out your own products.
const API_KEY = "pk_test_179599f1be163faccb79fed021771842e394369b757e9";

const commerce = new Commerce(API_KEY, true);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "ProductsPage",
      component: ProductsPage
    },
    {
      path: "/product/:productId",
      name: "ProductViewPage",
      component: ProductViewPage
    },
    {
      path: "/cart",
      name: "CartPage",
      component: CartPage
    }
  ]
});

new Vue({
  router,
  render: h => h(App, { props: { commerce } })
}).$mount("#app");
