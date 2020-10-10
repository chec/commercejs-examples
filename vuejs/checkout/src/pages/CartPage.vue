<template>
  <div>
    <h2 class="cartPage-empty-h2" v-if="!cartLength">Cart is Empty</h2>
    <CartItem
      v-for="product in cart.line_items"
      :product="product"
      :key="product.id"
      @updateItemQuantity="updateItemQuantity"
      @removeItem="removeItem"
    />
    <hr>
    <div class="cartPage-subTotal-div">
      <button
        v-if="cartLength"
        @click="pushToCheckoutPage"
        class="btn btn-primary"
      >🔒 Secure Checkout</button>

      <h3
        class="cartPage-subTotal-amount"
        v-if="cart.subtotal"
      >Cart Subtotal: {{ cart.subtotal.formatted_with_symbol }}</h3>
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
export default {
  name: "CartPage",
  components: {
    CartItem
  },
  props: {
    cart: {
      type: Object
    }
  },
  methods: {
    updateItemQuantity(id, quantity) {
      this.$emit("updateItemQuantity", id, quantity);
    },
    removeItem(id) {
      this.$emit("removeItem", id);
    },
    createCheckoutToken() {
      this.$emit("createCheckoutToken");
    },
    pushToCheckoutPage() {
      this.$router.push(`/checkout/${this.cart.id}/deliveryform`);
    }
  },
  computed: {
    cartLength() {
      return this.cart.line_items.length > 0 ? true : false;
    }
  }
};
</script>

<style scoped>
.cartPage-empty-h2 {
  margin: 10px 0;
}
.cartPage-subTotal-amount {
  margin: 10px 0;
}
.cartPage-subTotal-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
@media (max-width: 700px) {
  .cartPage-subTotal-div {
    flex-direction: column;
    margin-left: 20px;
  }
}
button {
  width: 175px;
}
</style>