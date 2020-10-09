<template>
  <div>
    <div class="hero-wrapper">
      <img src="/logo.svg" alt="Logo">
      <div class="hero-wrapper__text">
        <h2>Curated to
          <br>Your Lifestyle
        </h2>
        <div class="btn">Shop</div>
      </div>
    </div>
    <!-- Products catalogue -->
    <div class="container mx-auto px-4">
      <div class="flex mb-4">
        <div class="row">
          <!-- Loop through products and output -->
          <!-- :key is for Vue to keep track of items -->
          <div class="col-sm-4" v-for="product in products" :key="product.id">
            <!-- Bind product to cart -->
            <Product :product="product" @add-to-cart="addToCart(product)"/>
          </div>
          <!-- END Product Catalogue -->
        </div>
      </div>

      <Cart :items="cartItems" @remove-from-cart="removeFromCart"/>
    </div>
    <!-- END of App Container -->
  </div>
  <!-- END of Storefront -->
</template>

<script>
import Product from "@/components/Product.vue";
import Cart from "@/components/Cart.vue";

export default {
  name: "app",
  components: {
    Product,
    Cart
  },
  // Pass commerce as a prop
  props: {
    commerce: {
      required: true,
      type: Object
    }
  },
  // Return our product data
  data() {
    return {
      products: [],
      cart: null
    };
  },

  // When Vue app is created, run these functions to fetch data from API
  created() {
    // Make a request to list products
    this.commerce.products
      .list("furniture")
      .then(resp => {
        // Respond with products data upon a successful request
        this.products = resp.data;
      })
      // Handle Error
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });

    this.commerce.cart
      .retrieve()
      .then(resp => {
        this.cart = resp;
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });
  },

  methods: {
    // Add products to cart
    addToCart(product) {
      this.commerce.cart.add({ id: product.id, quantity: 1 }).then(resp => {
        this.cart = resp.cart;
      });
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Amiko", sans-serif;
  background-color: #E8E2D7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2 {
  letter-spacing: 3px;
}

.hero-wrapper {
  background-image: url("/hero-img.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 100vh;

  img {
    padding: 30px 0 0 30px;
    cursor: pointer;
  }

  &__text {
    color: #292B83;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translateX(-50%);
    text-align: left;

    h2 {
      font-weight: bold;
      font-size: 42px;
    }
  }

  .btn {
    background: #EF4E42;
    color: white;
    border-radius: 18px;
    text-transform: uppercase;
    &:hover {
      background: darken(#EF4E42, 8%);
      transition: all 0.3s ease;
    }
    &:active {
      background: darken(#EF4E42, 25%);
    }
  }
}
</style>
