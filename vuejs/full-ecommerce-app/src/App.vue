<template>
  <div id="app">
    <transition name="fade">
      <div v-if="uiStates.isLoading" class="page-loader">
          <font-awesome-icon size="4x" icon="cog" spin />
      </div>
    </transition>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">{{merchant.business_name}}</router-link>
      <ul class="navbar-nav  ml-auto show-mobile">
          <li class="nav-item">
            <div
              class="nav-link nav-cart"
              @click="uiStates.cartVisible = !uiStates.cartVisible">
              <font-awesome-icon size="lg" icon="shopping-cart" />
              <div class="cart-amount" v-if="cart.total_items > 0">{{this.cart.total_items}}</div>
            </div>
          </li>
      </ul>
      <button class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav navbar-main ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item hide-mobile" style="position: relative;">
            <div class="nav-link nav-cart" @click="uiStates.cartVisible = !uiStates.cartVisible">
              <font-awesome-icon size="lg" icon="shopping-cart" />
              <div class="cart-amount" v-if="cart.total_items > 0">{{this.cart.total_items}}</div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <transition name="grow">
      <cart
        v-if="uiStates.cartVisible"
        :cart="cart"
        @checkout="checkout"
        @clear-cart="clearCart"
        @remove-from-cart="removeFromCart"
      />
    </transition>
    <router-view
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      :products="products"
      :merchant="merchant"
      :cart="cart"
      :orderRef="orderRef"
    />
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faCog } from '@fortawesome/free-solid-svg-icons';
import Cart from './views/Cart.vue';


library.add(faShoppingCart, faCog);

export default {
  name: 'app',
  components: {
    Cart,
  },
  data() {
    return {
      merchant: {
        business_name: 'Loading...',
      },
      products: [],
      cart: [],
      orderRef: null,
      checkoutToken: null,
      uiStates: {
        isLoading: true,
        cartVisible: false,
      },
    };
  },
  created() {
    this.getProducts();
    this.getMerchantInformation();
    this.getCart();
  },
  methods: {
    getProducts() {
      this.$commerce.products.list().then((result) => {
        this.products = result.data.map((product) => product);
        this.uiStates.isLoading = false;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    getMerchantInformation() {
      this.$commerce.merchants.about().then((result) => {
        this.merchant = result;
        document.title = `${this.merchant.business_name} - Products`;
      }).catch((error) => {
        console.error(`Merchant Error: ${error.message}`);
      });
    },
    getCart() {
      this.$commerce.cart.retrieve().then((result) => {
        this.cart = result;
      }).catch((error) => {
        console.error(`Cart Error: ${error.message}`);
      });
    },
    addToCart({ productId, productAmount, productVariant }) {
      this.$commerce.cart.add(
        productId,
        productAmount,
        productVariant,
      ).then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Add to Cart Error: ${error.message}`);
      });
    },
    clearCart() {
      this.$commerce.cart.empty().then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Clear Cart Error: ${error.message}`);
      });
    },
    removeFromCart(itemId) {
      this.$commerce.cart.remove(itemId).then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Remove from Cart Error: ${error.message}`);
      });
    },
    checkout() {
      this.$router.push('/checkout');
      this.uiStates.cartVisible = false;
    },
  },
};
</script>
<style lang="scss">
@import 'styles/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar{
  margin-bottom: 2rem;
}
.cart-amount{
  background-color: #DEDACF;
  width: 20px;
  height: 20px;
  font-size: 13px;
  color: #1c1c1c;
  font-weight: 600;
  border-radius: 50%;
  text-align: center;
  padding-top: 2px;
  position: absolute;
  top: -2px;
  right: 0px;
}
.nav-cart{
  position: relative;
  min-width: 40px;
  cursor: pointer;
}

.navbar-dark .navbar-toggler{
  border-color:transparent;
}

.navbar-main .nav-item{
  @media only screen and (max-width: 991px) {
      border-top: 1px solid grey;
      margin-top: 6px;
      padding-top: 5px;
  }
}

.grow-enter-active, .grow-leave-active {
  transition: all .5s;
}
.grow-enter, .grow-leave-to {
  opacity: 0;
  height: 1px;
  padding: 0rem 0rem !important;
}
.page-loader{
  margin-top: 56px;
  width: 100%;
  position: fixed;
  z-index: 2;
  background-color: #EFEBE7;
  top:0px;
  bottom:0px;
  text-align: center;
  padding-top:20rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
