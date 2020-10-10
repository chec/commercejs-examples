
<template>
  <div class="card my-5" style="height:41rem;">
    <div class="card-body">
      <img :src="product.media.source" :alt="product.name" class="card-img-top">
      <h4 class="title text-center card-title display-5">{{product.name}}</h4>
      <p class="description text-center card-text display-5" v-html="product.description"></p>
      <p
        class="text-center text-muted card-subtitle display-5 price"
      >{{product.price.formatted_with_symbol}}</p>
      <button class="btn-add mt-3" @click="$emit('add-to-cart', product)">Quick Add</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"]
};
</script>

<style>
body {
  letter-spacing: 2px;
}
.card h4 {
  padding-top: 20px;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
}

.card p {
  padding-top: 5px;
}

.card button {
  background-color: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  transition: all 0.3s ease-in-out;
  justify-content: flex-end;
  position: relative;
  display: flex;
  margin: 0 auto;
  line-height: 32px;
}

.card button:hover {
  background-color: black;
  color: #fff;
  border: 1px solid black;
}

@media only screen and (max-width: 400px) {
  .card {
    height: 48rem;
  }
}
</style>