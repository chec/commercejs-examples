<template>
  <div class="card orderSummary-card">
    <div class="card-body">
      <h4 class="card-title">Order Summary</h4>
      <hr>
      <OrderSummaryItem v-for="item in live.line_items" :item="item" :key="item.id"/>
      <hr>
      <div class="d-flex justify-content-between">
        <p>Subtotal</p>
        <p>{{ live.subtotal.formatted_with_symbol }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>Shipping</p>
        <p>{{ live.shipping.price.formatted_with_symbol }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>Tax</p>
        <p>{{ live.tax.amount.formatted_with_symbol }}</p>
      </div>
      <hr>
      <div class="d-flex justify-content-between">
        <h5>Total with Tax</h5>
        <h5>{{ live.total_with_tax.formatted_with_symbol }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSummaryItem from "./OrderSummaryItem";
export default {
  name: "OrderSummary",
  props: ["live"],
  components: {
    OrderSummaryItem
  }
};
</script>

<style>
.orderSummary-card {
  margin: 20px 0;
}
</style>
