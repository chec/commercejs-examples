<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Thank you for your order!</h3>
      <hr>
      <div class="confirmation-order_info">
        <div class="d-flex justify-content-between">
          <h6>Order Number</h6>
          <p>{{ receipt.customer_reference }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h6>Order Date</h6>
          <p>{{ moment().millisecond(receipt.created/1000).format("ddd MMM D YYYY") }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5>Shipping Address</h5>
          <p>{{ receipt.shipping.name }}</p>
          <p>{{ receipt.shipping.street }}</p>
          <p>{{ receipt.shipping.town_city }}, {{ receipt.shipping.county_state}}, {{ receipt.shipping.postal_zip_code }} {{ receipt.shipping.country }}</p>
          <p>{{ receipt.customer.email }}</p>
        </div>
        <div class="col">
          <h5>Payment Method</h5>
          <p>{{ receipt.payments[0].card_type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Confirmation",
  props: {
    receipt: {
      type: Object
    }
  },
  data() {
    return {
      moment: moment
    };
  }
};
</script>

<style scoped>
.card {
  margin: 20px 0;
}

.confirmation-order_info {
  width: 400px;
}

.row .col p {
  margin: 0;
}
</style>

