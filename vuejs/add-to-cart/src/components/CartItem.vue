<template>
  <div class="card-body">
    <div>
      <img :src="product.media.source" class="card-img-top" :alt="product.name">
      <h5 class="card-title">{{product.name}}</h5>
      <h6 class="card-subtitle">Price: ${{product.price.formatted_with_symbol}}</h6>
    </div>
    <div>
      <h5>Quantity: {{ product.quantity }}</h5>
      <h6>Update item quantity</h6>
      <input @input="onChange" :value="quantity" type="number" step="1" min="1">
      <button @click="updateItemQuantity">Update</button>
      <button @click="removeItem" class="remove-button">Remove Item</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      quantity: 1
    };
  },
  methods: {
    onChange(e) {
      this.quantity = e.target.value;
    },
    updateItemQuantity() {
      this.$emit("updateItemQuantity", this.product.id, this.quantity);
    },
    removeItem() {
      this.$emit("removeItem", this.product.id);
    }
  }
};
</script>

<style scoped>
div {
  width: 220px;
  margin-right: 50px;
}

div input {
  width: 50px;
}
.card-body {
  display: flex;
  width: 100%;
  align-items: center;
}
.remove-button {
  border: none;
  background: none;
  color: dodgerblue;
  margin-top: 50px;
}
</style>

