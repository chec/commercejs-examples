<template>
  <div class="card-body">
    <router-link :to="{ name: 'ProductViewPage', params: { productId: product.id } }">
      <span @click="onClick">
        <img :src="product.media.source" class="card-img-top" :alt="product.name">
        <h5 class="card-title">{{product.name}}</h5>
      </span>
    </router-link>
    <h6 class="card-subtitle">{{product.price.formatted_with_symbol}}</h6>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    onClick() {
      this.$emit("viewProduct", this.product);
    }
  }
};
</script>

<style scoped>
div {
  max-width: 220px;
  max-height: 300px;
  margin: 0 20px;
}

@media (max-width: 700px) {
  div {
    margin: 0 auto;
  }
}

</style>

