<template>
  <div>
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
  }
  // created() {
  //   this.commerce.products
  //     .list()
  //     .then(res => {
  //       console.log(res.data);
  //       this.products = res.data;
  //     })
  //     .catch(err => console.log(err));
  // }
};
</script>

<style scoped>
</style>

