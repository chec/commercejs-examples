<template>
  <form name="paymentForm" @submit="onSubmit">
    <h3>Payment Method</h3>
    <div class="form-group">
      <label for="checkout-number">Card Number</label>
      <input
        type="text"
        class="form-control"
        id="checkout-number"
        name="number"
        required
        @change="onChange"
        :value="paymentForm.number"
      >
    </div>
    <div class="row">
      <div class="col">
        <label for="checkout-cardNumber">Expiration Date MM/YY</label>
        <input
          type="text"
          class="form-control"
          name="expire"
          required
          @change="onChange"
          pattern="([0-9]{2}[/]?){2}"
          :value="paymentForm.expire"
        >
      </div>
      <div class="col">
        <label for="checkout-cardNumber">CVC ###</label>
        <input
          type="text"
          class="form-control"
          name="cvc"
          required
          @change="onChange"
          pattern="([0-9]{3})"
          :value="paymentForm.cvc"
        >
      </div>
    </div>
    <button class="btn btn-primary">Submit Order</button>
  </form>
</template>

<script>
export default {
  name: "PaymentForm",
  props: ["paymentForm"],
  methods: {
    onChange(e) {
      this.$emit("onChange", e);
    },
    onSubmit(e) {
      this.$emit("onSubmit", e);
    }
  }
};
</script>

<style scoped>
form {
  margin: 20px 0;
}
button {
  margin: 20px 0;
}
</style>
