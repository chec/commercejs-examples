<template>
  <div class="container">
    <Header/>
    <router-view
      :products="products"
      @viewProduct="handleViewProduct"
      :productInView="productInView"
      :status="status"
      @addProductToCart="handleAddProductToCart"
      :cart="cart"
      @updateItemQuantity="handleUpdateItemQuantity"
      @removeItem="handleRemoveItem"
    />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  props: {
    commerce: {
      type: Object,
      required: true
    }
  },
  components: {
    Header
  },
  data() {
    return {
      products: [],
      productInView: {},
      cart: [],
      status: undefined
    };
  },
  methods: {
    handleViewProduct(product) {
      this.productInView = product;
      this.status = undefined;
    },
    handleUpdateItemQuantity(id, quantity) {
      this.commerce.cart
        .update(id, { quantity })
        .then(res => {
          this.cart = res.cart.line_items;
        })
        .catch(err => console.log(err));
    },
    handleRemoveItem(id) {
      this.commerce.cart
        .remove(id)
        .then(res => {
          this.cart = res.cart.line_items;
        })
        .catch(err => console.log(err));
    },
    handleAddProductToCart(product) {
      this.commerce.cart
        .add(product.id)
        .then(res => {
          this.status = "Item added to cart!";
          this.cart = res.cart.line_items;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    if (this.$route.params.productId && this.productInView) {
      this.commerce.products
        .retrieve(this.$route.params.productId)
        .then(res => {
          this.productInView = res;
        })
        .catch(err => console.log(err));
    }
    this.commerce.products
      .list()
      .then(res => {
        
        this.products = res.data;
      })
      .catch(err => console.log(err))
      .then(() => {
        this.commerce.cart
          .retrieve()
          .then(res => {
            console.log(res.line_items)
            this.cart = res.line_items;
          })
          .catch(err => console.log(err));
      });
  }
};
</script>

<style>
</style>
