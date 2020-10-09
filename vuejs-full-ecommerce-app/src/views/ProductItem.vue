<template>
    <div v-if="product">
        <div class="card product-item">
            <img class="card-img-top" :src="product.media.source" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center">{{product.name}}</h5>
                <p class="card-price text-center">${{product.price.formatted}}</p>
                <p class="text-center">
                  <span class="badge badge-primary"
                    v-for="(category, index) in product.categories"
                    :key="index"
                  >
                    {{category.name}}
                  </span>
                </p>
                <div class="card-text text-center" v-html="product.description">Loading...</div>
                <div class="row justify-content-center" style="margin-top:2rem">
                    <div class="col-md-4 text-left"  v-if="product.variants">
                        <div class="form-group"
                            :key="index"
                            v-for="(variant, index) in product.variants">
                            <label for="">{{variant.name}}</label>
                            <select
                                v-model="selectedVariant"
                                class="form-control"
                                :name="variant.name"
                                placeholder="Choose..."
                            >
                                <option value="">Choose...</option>
                                <option
                                    :value="option"
                                    :key="index"
                                    v-for="(option, index) in variant.options">
                                    {{`${option.name} (${option.quantity} in stock)`}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 text-left">
                        <div class="form-group">
                            <label for="">Quantity</label>
                            <select
                                v-model="selectedAmount"
                                @change="checkQuantity()"
                                class="form-control"
                                name="amount"
                                placeholder="Choose..."
                            >
                                <option value="">Choose...</option>
                                <option :value="amount" :key="index" v-for="(amount, index) in 10">
                                    {{amount}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <button
                          @click="addToCart()"
                          :disabled="quantityWarning.enabled"
                          class="btn btn-primary"
                        >
                          Add to Cart
                        </button>
                        <div v-if="quantityWarning.enabled" class="quantity-remaining swatch-red">
                        Only {{quantityWarning.amount}} Remaining</div>
                    </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      selectedVariant: '',
      selectedAmount: '',
      quantityWarning: {
        enabled: false,
        amount: '',
      },
    };
  },
  methods: {
    checkQuantity() {
      this.quantityWarning.enabled = false;
      let amount = this.product.quantity;
      if (this.product.variants) {
        amount = this.selectedVariant.quantity;
      }
      if (amount < this.selectedAmount) {
        this.quantityWarning.enabled = true;
        this.quantityWarning.amount = amount;
      }
    },
    addToCart() {
      let variant = null;
      if (this.product.variants) {
        variant = { [this.product.variants[0].id]: this.selectedVariant.id };
      }
      this.$emit('add-to-cart', {
        productId: this.product.id,
        productAmount: this.selectedAmount,
        productVariant: variant,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .btn{
        margin-top: 32px;
        width: 100%;
    }
    .form-control{
        width: 100%;
    }
    .product-item{
        margin-bottom:2rem;
    }
    .card{
        border:0;
        background-color: transparent;
    }
    .card-text{
        min-height: 195px;
    }
    .quantity-remaining{
        text-align: right;
        margin-top:2px;
        font-size: 11px;
        color: #dc3545;
    }
</style>
