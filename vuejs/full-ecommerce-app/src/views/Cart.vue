<template>
  <div class="cart-items-container">
    <div class="cart-heading clearfix">
      <div class="row">
        <div class="col-6">
          <div class="title">Items in your Cart</div>
        </div>
        <div class="col-6" v-if="cart.line_items.length">
          <button class="btn btn-primary checkout" @click="$emit('checkout')">Checkout</button>
          <div class="clear-cart" @click="$emit('clear-cart')">Clear Cart</div>
        </div>
      </div>
    </div>
    <div class="close" @click="$parent.uiStates.cartVisible = false">
      <font-awesome-icon icon="times" />
    </div>
    <div v-if="cart.line_items.length">
      <div v-for="(item, index) in cart.line_items" :key="index" class="cart-item">
        <img class="cart-thumb" :src="item.media.source" alt="">
        <div>
          <div class="name">{{item.name}}</div>
          <div class="quantity">Quantity: {{item.quantity}}</div>
          <div
            v-if="item.variants.length"
            class="quantity"
          >Size: {{item.variants[0].option_name}}</div>
        </div>
        <div class="price">${{item.price.formatted * item.quantity}}</div>
        <button
          class="badge badge-danger"
          @click="$emit('remove-from-cart', item.id)"
        >
          Remove
        </button>
      </div>
    </div>
    <div class="no-cart" v-else>
      <h5 class="text-center">Your cart appears to be empty</h5>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
export default {
  name: 'Cart',
  props: ['cart'],
};
</script>

<style scoped lang="scss">

  .cart-items-container{
    background-color: #DEDACF;
    position: relative;
    margin-top:-2rem;
    padding: 2rem 0;
    overflow-x:auto;
    margin-bottom: 2rem;
  }
  .badge-danger{
    margin-top: 10px;
  }
  .cart-heading{
    padding:0 2rem;
    border-bottom: 1px solid rgba(28,28,28,.25);
    padding-bottom: 2rem;
    .title{
      margin-top: 2px;
      font-size: 24px;
      float: left;
    }
    .checkout, .clear-cart{
      float: right;
    }
    .clear-cart{
      margin-top:7px;
      margin-right: 1rem;
      color: #CA2F0C;
      cursor: pointer;
    }
  }
  .no-cart{
    padding: 2.5rem 1rem 0;
  }
  .cart-item{
    float: left;
    width:200px;
    padding:0 1rem;
    text-align: center;
    .cart-thumb{
      max-width: 100%
    }
    .name{
      font-weight: 600;
    }
    .quantity{
      font-size: 12px;
    }
  }
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer
  }
</style>
