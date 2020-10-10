<template>
  <div>
    <h2>{{ ifEmpty }}</h2>
    <CartItem
      v-for="product in cart"
      :product="product"
      :key="product.id"
      @updateItemQuantity="updateItemQuantity"
      @removeItem="removeItem"
    />
    <div>
      <hr>
      <h3 class="subtotal">Cart Subtotal: $ {{ cartTotal }}</h3>
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
      type: Array
    }
  },
  methods: {
    updateItemQuantity(id, quantity) {
      this.$emit("updateItemQuantity", id, quantity);
    },
    removeItem(id) {
      this.$emit("removeItem", id);
    }
  },
  computed: {
    ifEmpty() {
      return this.cart.length === 0 ? "Cart is empty" : undefined;
    },
    cartTotal() {
      return this.cart.reduce(
        (acc, currentEl) => acc + currentEl.quantity * currentEl.price.raw,
        0
      );
    }
  }
};
</script>

<style scoped>
.subtotal {
  text-align: right;
}
</style>

