<template>
  <div class="productsPage-div">
    <ProductCard
      v-for="product in products"
      :product="product"
      :key="product.id"
      @viewProduct="viewProduct"
    />
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "ProductsPage",
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array
    }
  },
  methods: {
    viewProduct(product) {
      this.$emit("viewProduct", product);
    }
  },
  computed: {
    
  }
};
</script>

<style scoped>
.productsPage-div {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .productsPage-div {
    display: block;
  }
}
</style>

