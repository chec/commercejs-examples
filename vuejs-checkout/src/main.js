import Vue from "vue";
import VueRouter from "vue-router";
import Commerce from "@chec/commerce.js";

import App from "./App.vue";
import CartPage from "./pages/CartPage.vue";
import ProductViewPage from "./pages/ProductViewPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue";
import DeliveryForm from "./components/DeliveryForm";
import PaymentForm from "./components/PaymentForm.vue";
import Confirmation from "./components/Confirmation.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

// Pass in your own API key to list out your own products.
const API_KEY = "pk_test_17958b576e2ba6850e3191cf217db928655e7e63d4c7b";

const commerce = new Commerce(API_KEY, true);

const router = new VueRouter({
  linkExactActiveClass: "active",
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
    },
    {
      path: "/checkout/:id",
      name: "CheckoutPage",
      component: CheckoutPage,
      children: [
        {
          path: "deliveryform",
          component: DeliveryForm
        },
        {
          path: "paymentform",
          component: PaymentForm
        },
        {
          path: "confirmation",
          component: Confirmation
        }
      ]
    }
  ]
});

new Vue({
  router,
  render: h => h(App, { props: { commerce } })
}).$mount("#app");
