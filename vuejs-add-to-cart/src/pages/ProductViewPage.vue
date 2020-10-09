<template>
  <div>
    <div class="container">
      <div>
        <img :src="productInView.media.source" class="img-fluid">
        <h6>Description:</h6>
        <p v-html="productInView.description"/>
      </div>
      <div class="product-info">
        <h3>{{ productInView.name }}</h3>
        <h4>{{productInView.price.formatted_with_symbol}}</h4>
        <button @click="addProductToCart" class="add-to-cart-button">Add to cart</button>
        <p>{{ status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductViewPage",
  props: {
    productInView: {
      type: Object
    },
    status: {
      type: String
    }
  },
  methods: {
    addProductToCart() {
      this.$emit("addProductToCart", this.productInView);
    }
  }
};
</script>

<style scoped>
img {
  width: 500px;
}
.container {
  display: flex;
}
.product-info {
  margin-top: 50px;
  margin-left: 50px;
}

.product-info p {
  margin-top: 10px;
}
.add-to-cart-button {
  background: dodgerblue;
  border: none;
  color: white;
  padding: 10px 20px;
}
</style>

