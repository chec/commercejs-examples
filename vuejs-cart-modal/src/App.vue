<template>
  <div id="app">
    <div class="header">
      <button class="btn-cart" @click="toggleCart">View Cart</button>
      <p v-if="cartItems">{{cart.total_items}}</p>
    </div>

    <Cart :items="cartItems" v-if="displayCart" @remove-from-cart="removeFromCart"/>
    <div class="container mx-auto px-4">
      <div class="flex mb-4">
        <div class="row">
          <div v-for="product in products" :key="product.id" class="col-sm-4">
            <Product :product="product" @add-to-cart="addToCart(product)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Import Commerce dependency
import Commerce from "@chec/commerce.js";
import Product from "@/components/Product.vue";
import Cart from "@/components/Cart.vue";

// Initialize store with public key
const commerce = new Commerce(
  "pk_168757b95ff55c066b59b9e93c48a2b0e7bc1b97c798b",
  true
);

export default {
  name: "app",
  components: {
    Product,
    Cart
  },

  data() {
    return {
      products: [],
      cart: [],
      displayCart: false
    };
  },

  created() {
    commerce.products
      .list()
      .then(response => {
        // Success
        this.products = response.data;
      })
      // Error
      .catch(error => {
        console.log(error);
      });

    //Invoke commerce cart method to retrieve cart in session
    commerce.cart
      .retrieve()
      .then(response => {
        //Successful response
        this.cart = response;
      })
      //Error
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });
  },

  methods: {
    //Add products to cart
    addToCart(product) {
      commerce.cart
        .add({
          id: product.id,
          quantity: 1
        })
        .then(response => {
          this.cart = response.cart;
        });
    },

    toggleCart() {
      this.displayCart = !this.displayCart;
    },

    close(close) {
      this.$emit(close);
    },

    removeFromCart(lineItemId) {
      commerce.cart
        .remove(lineItemId)
        .then(response => {
          this.cart = response.cart;
        })
        .catch(error => {
          //eslint-disable-next-line
          console.log(error);
        });
    }
  },

  computed: {
    cartItems() {
      return this.cart ? this.cart.line_items : [];
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-top: 30px;
  padding-right: 20px;
}

.header button {
  text-decoration: none;
  background-color: black;
  color: #fff;
  padding: 0 15px;
  cursor: pointer;
  border: 1px solid black;
  transition: 0.3s all ease-in-out;
  height: 40px;
}

.header button:hover {
  background-color: white;
  color: black;
  line-height: 30px;
}

.header p {
  padding: 10px 10px;
}
</style>