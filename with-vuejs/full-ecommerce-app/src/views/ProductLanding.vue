<template>
  <div class="product-landing-page">
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1 style="margin-bottom:1rem">Products</h1>
        </div>
        <div class="col-7 text-right" v-if="categories">
          <button class="btn btn-primary btn-clear" @click="selectedCategory = ''">
            Clear
          </button>
          <div class="form-group form-categories">
            <select
              v-model="selectedCategory"
              class="form-control"
            >
              <option value="">Filter Categories...</option>
              <option
                :value="category.name"
                :key="index"
                v-for="(category, index) in categories.data"
              >
                {{category.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12"><hr></div>
      </div>
      <div class="row" v-if="this.filteredItems">
          <ProductItem
            @add-to-cart="$emit('add-to-cart', $event)"
            class="col-md-6"
            v-for="(product, index) in filteredItems" :key="index"
            :product="product"
          />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductLanding',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    merchant: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCategory: '',
      categories: [],
    };
  },
  components: {
    ProductItem,
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    filteredItems() {
      let filteredProducts = this.products;

      if (this.selectedCategory !== '') {
        // eslint-disable-next-line max-len
        filteredProducts = this.products.filter((product) => product.categories[0].name === this.selectedCategory);
      }

      return filteredProducts;
    },
  },
  methods: {
    getCategories() {
      axios.get(`https://api.chec.io/v1/categories`, {
        headers: {
          'X-Authorization': "pk_1804536f3a6e73f039fb5739829ff9d02037fbdbeb51a",
        },
      }).then((result) => {
        this.categories = result.data;
      }).catch((error) => {
        console.error(`Category Retreval Error: ${error.message}`);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.form-categories{
  width:200px;
  float: right;
  margin-top: .3rem;
}
.btn-clear{
  float:right;
  margin-top:2px;
  margin-left:.5rem;
  margin-top: .3rem;
}
</style>
