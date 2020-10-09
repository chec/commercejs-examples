<template>
  <div>
    <OrderSummary v-if="live" :live="live" id="OrderSummary"/>
    <div v-if="status" class="alert alert-danger fade show" role="alert">{{ status }}</div>
    <router-view
      @onChange="handleOnChange"
      @onShippingChange="setShippingMethod"
      @onSubmit="handleOnSubmit"
      :disableStates="disableStates"
      :states="states"
      :countries="countries"
      :shippingMethods="shippingMethods"
      :receipt="receipt"
      :paymentForm="paymentForm"
    />
  </div>
</template>

<script>
import OrderSummary from "../components/OrderSummary";
import CreditCard from "creditcard.js";
export default {
  name: "CheckoutPage",
  components: {
    OrderSummary
  },
  props: {
    commerce: {
      type: Object
    },
    checkoutToken: {
      type: Object,
      required: true
    }
  },
  data() {
    // Dummy payment data - used to prepopulate payment form for quick testing

    const dummyPaymentData = {
      number: "4242424242424242",
      expire: "03/20",
      cvc: "407"
    };
    return {
      live: this.checkoutToken.live,
      validator: new CreditCard(),
      deliveryForm: {
        country: ""
      },
      paymentForm: dummyPaymentData,
      countries: {},
      states: {},
      status: "",
      shippingMethods: [],
      receipt: {}
    };
  },
  methods: {
    handleOnChange(e) {
      const { form, name, value } = e.target;
      this[form.name][name] = value;
      form.name === "deliveryForm" && this.updateCheckoutSubtotal();
    },
    handleOnSubmit(e) {
      e.preventDefault();
      if (
        e.target.name === "deliveryForm" &&
        this.deliveryForm.shipping_method
      ) {
        this.status = "";
        this.$router.push(`/checkout/${this.$route.params.id}/paymentform`);
      } else if (e.target.name === "paymentForm") {
        const isValidated = this.validator.isValid(this.paymentForm.number);
        if (isValidated) {
          this.status = "";
          const spacedNumber = this.paymentForm.number.replace(
            /(\d{4}(?!\s))/g,
            "$1 "
          );
          const splitExpire = this.paymentForm.expire.split("/");
          this.handleCapture(spacedNumber, splitExpire[0], splitExpire[1]);
        } else {
          this.status = "The card number you entered is invalid.";
        }
      } else {
        this.status = "Delivery must have a shipping method.";
        document.getElementById("OrderSummary").scrollIntoView();
      }
    },
    updateCheckoutSubtotal() {
      if (this.deliveryForm.country) {
        const { country, zip_code, state } = this.deliveryForm;
        if (
          this.deliveryForm.country === "US" &&
          this.deliveryForm.zip_code &&
          this.deliveryForm.state
        ) {
          this.checkShippingAndTax(country, zip_code, state);
        } else {
          this.checkShippingAndTax(country);
        }
      }
    },
    checkShippingAndTax(country, zip_code = "", state = "") {
      this.commerce.checkout
        .setTaxZone(this.checkoutToken.id, {
          postal_zip_code: zip_code,
          country: country,
          region: state
        })
        .then(res => {
          this.live = res.live;
        })
        .catch(err => console.log(err));

      this.commerce.checkout
        .getShippingOptions(this.checkoutToken.id, {
          country: country,
          region: state
        })
        .then(res => {
          this.shippingMethods = res;
        })
        .catch(err => {
          console.log(err);
          this.shippingMethods = [];
          this.deliveryForm.shipping_method = "";
        });
    },
    setShippingMethod(shippingId) {
      this.commerce.checkout
        .checkShippingOption(this.checkoutToken.id, {
          shipping_option_id: shippingId,
          country: this.deliveryForm.country,
          region: this.deliveryForm.state
        })
        .then(res => {
          this.deliveryForm.shipping_method = shippingId;
          this.live = res.live;
        })
        .catch(err => console.log(err));
    },
    handleCapture(number, month, year) {
      let line_items = {};
      this.live.line_items.forEach(item => {
        line_items[item.id] = { quantity: item.quantity };
      });
      const d = this.deliveryForm;
      const p = this.paymentForm;
      const data = {
        line_items,
        customer: {
          firstname: d.firstname,
          lastname: d.lastname,
          email: d.email
        },
        shipping: {
          name: d.recipient,
          street: d.street,
          town_city: d.town_city,
          county_state: d.state,
          postal_zip_code: d.zip_code,
          country: d.country
        },
        fulfillment: {
          shipping_method: d.shipping_method
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: number,
            expiry_month: month,
            expiry_year: year,
            cvc: p.cvc,
            postal_zip_code: d.zip_code
          }
        }
      };
      this.commerce.checkout
        .capture(this.checkoutToken.id, data)
        .then(res => {
          this.receipt = res;
          this.$router.push(`/checkout/${res.customer_reference}/confirmation`);
          this.$emit("getNewCart");
        })
        .catch(err => {
          console.log(err);
          this.shippingMethods = [];
        });
    }
  },
  computed: {
    disableStates() {
      return this.deliveryForm.country === "US" ? false : true;
    }
  },
  watch: {
    checkoutToken() {
      this.live = this.checkoutToken.live;
    }
  },
  created() {
    this.commerce.services
      .localeListCountries(this.checkoutToken.id)
      .then(res => {
        this.countries = { "": "Select a country", ...res.countries };
      })
      .catch(err => console.log(err));
    this.commerce.services
      .localeListSubdivisions("US")
      .then(res => {
        this.states = { "": "Select a state", ...res.subdivisions };
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.alert {
  margin-top: 20px;
}
</style>
