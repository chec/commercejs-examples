<template>
  <form name="deliveryForm" @submit="onSubmit">
    <h3>Customer</h3>
    <div class="form-group row">
      <label for="checkout-email" class="col-sm-2 col-form-label">Email address</label>
      <input
        type="email"
        class="form-control col-sm-10"
        id="checkout-email"
        name="email"
        @change="onChange"
        required
      >
    </div>
    <div class="form-group row">
      <div class="col">
        <label for="checkout-firstname">First name</label>
        <input type="text" class="form-control" name="firstname" required @change="onChange">
      </div>
      <div class="col">
        <label for="checkout-lastname">Last name</label>
        <input type="text" class="form-control" name="lastname" required @change="onChange">
      </div>
    </div>

    <h3>Delivery</h3>
    <div class="form-group row">
      <label for="checkout-recipient" class="col-sm-2 col-form-label">Recipient Name</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-recipient"
        name="recipient"
        @change="onChange"
        required
      >
    </div>
    <div class="form-group row">
      <label for="checkout-street" class="col-sm-2 col-form-label">Street Address</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-street"
        name="street"
        @change="onChange"
        required
      >
    </div>
    <div class="form-group row">
      <label
        for="checkout-optionalAddress"
        class="col-sm-2 col-form-label"
      >Apt, Suite, etc. (Optional)</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-optionalAddress"
        name="optionalAddress"
        @change="onChange"
      >
    </div>
    <div class="form-group row">
      <label for="checkout-town_city" class="col-sm-2 col-form-label">Town/City</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-town_city"
        name="town_city"
        @change="onChange"
        required
      >
    </div>
    <div class="form-group row">
      <label for="checkout-zip_code" class="col-sm-2 col-form-label">Zip Code</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-zip_code"
        name="zip_code"
        @change="onChange"
        required
      >
    </div>
    <div class="form-group row">
      <label for="checkout-states" class="col-sm-2 col-form-label">State</label>
      <select
        class="form-control col-sm-10"
        id="checkout-states"
        name="state"
        @change="onChange"
        :disabled="disableStates"
        required
      >
        <option
          v-for="(state, i) in Object.keys(states)"
          :value="state"
          :key="i"
        >{{ states[state] }}</option>
      </select>
    </div>
    <div class="form-group row">
      <label for="checkout-country" class="col-sm-2 col-form-label">Country</label>
      <select
        class="form-control col-sm-10"
        id="checkout-country"
        name="country"
        @change="onChange"
        required
      >
        <option
          v-for="(country, i) in Object.keys(countries)"
          :value="country"
          :key="i"
        >{{ countries[country] }}</option>
      </select>
    </div>
    <div class="form-group row">
      <label for="checkout-number" class="col-sm-2 col-form-label">Phone Number</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-number"
        name="number"
        @change="onChange"
        required
      >
    </div>
    <h5>Shipping Method</h5>
    <div v-for="method in shippingMethods" :key="method.id" class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="shipping_method"
        :value="method.id"
        @change="onShippingChange"
        required
      >
      <label class="form-check-label" for="exampleRadios1">
        {{
        method.description
        }}
      </label>
    </div>
    <p v-if="shippingMethods.length === 0">No shipping methods currently available.</p>
    <button class="btn btn-primary">Continue to Payment</button>
  </form>
</template>

<script>
export default {
  name: "DeliveryForm",
  methods: {
    onChange(e) {
      this.$emit("onChange", e);
    },
    onShippingChange(e) {
      this.$emit("onShippingChange", e.target.value);
    },
    onSubmit(e) {
      this.$emit("onSubmit", e);
    }
  },
  props: ["disableStates", "states", "countries", "shippingMethods"]
};
</script>

<style>
form {
  margin: 20px 0;
}

.form-check {
  margin-bottom: 20px;
}
</style>
