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
  name: "Product",
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
  width: 220px;
}
</style>

