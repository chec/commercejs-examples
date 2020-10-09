<template>
  <div v-if="productInView">
    <div v-if="status" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ status }}
      <button
        @click="removeStatus"
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="container">
      <div>
        <img :src="productInView.media.source" class="img-fluid">
        <h6>Description:</h6>
        <p v-html="productInView.description"/>
      </div>
      <div class="product-info">
        <h3>{{ productInView.name }}</h3>
        <h4>{{productInView.price.formatted_with_symbol}}</h4>
        <button @click="addProductToCart" class="btn btn-primary">Add to cart</button>
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
    },
    removeStatus() {
      this.$emit("removeStatus");
    }
  }
};
</script>

<style scoped>
.alert {
  margin-top: 10px;
}

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
</style>

