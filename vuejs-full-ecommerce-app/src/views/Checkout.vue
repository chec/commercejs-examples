<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1 style="margin-bottom:2rem">Checkout</h1>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 order-sm-2 order-md-1">
        <div class="row">
          <div class="col-12">
            <h4>Customer Details</h4>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
                <label for="">First Name</label>
                <input v-model="fields.customer.firstname" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Last Name</label>
                <input v-model="fields.customer.lastname" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Email</label>
                <input v-model="fields.customer.email" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4>Shipping Details</h4>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
                <label for="">Name</label>
                <input v-model="fields.shipping.name" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Street</label>
                <input v-model="fields.shipping.street" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">City/Town</label>
                <input v-model="fields.shipping.town_city" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Province</label>
                <input v-model="fields.shipping.county_state" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Country</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.shipping.country" type="text" class="form-control" disabled="">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Postal/Zip</label>
                <input v-model="fields.shipping.postal_zip_code"  type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4>Shipping Options</h4>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
                <label for="">Shipping Method</label>
                <select
                  v-model="fields.fulfillment.shipping_method"
                  name=""
                 class="form-control">
                    <option value="">Choose...</option>
                    <option
                      :key="index"
                      v-for="(option, index) in shippingOptions"
                      :value="option.id"
                    >
                      {{option.description}}
                    </option>
                </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4>Payment Options</h4>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
                <label for="">Card Number</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.payment.card.number" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Expirey Month</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.payment.card.expiry_month" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Expirey Year</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.payment.card.expiry_year" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">CVC</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.payment.card.cvc" type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <label for="">Postal Code</label>
                <!-- eslint-disable-next-line max-len -->
                <input v-model="fields.payment.card.postal_zip_code" type="text" class="form-control">
            </div>
          </div>
          <div class="col-12 show-mobile">
            <button class="btn btn-primary mb-4" @click="captureCheckout()">Confirm Order</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 order-sm-1 order-md-2">
        <h4>Cart</h4>
        <div v-if="cart.line_items" class="cart-container">
          <div class="cart-item" v-for="(item, index) in cart.line_items" :key="index">
            <div class="row">
              <div class="col-4">
                <div class="thumb-container">
                  <img class="cart-thumb" :src="item.media.source" alt="">
                </div>
              </div>
              <div class="col-8">
                <div>
                  <div class="name">{{item.name}}</div>
                  <div class="quantity">Quantity: {{item.quantity}}</div>
                  <div
                    v-if="item.variants.length"
                    class="quantity"
                  >Size: {{item.variants[0].option_name}}</div>
                </div>
                <div class="price">
                  <!-- eslint-disable-next-line max-len -->
                  ${{item.price.formatted * item.quantity}}
                </div>
                <button
                  class="badge badge-danger"
                  @click="$emit('remove-from-cart', item.id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div class="cart-item total text-right">
            <strong>Total:</strong> {{cart.subtotal.formatted_with_symbol}}
          </div>
        </div>
        <button
          class="btn btn-primary hide-mobile"
          @click="captureCheckout()"
        >Confirm Order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: ['cart', 'merchant'],
  data() {
    return {
      fields: {
        line_items_foo: null,
        line_items: this.cart.line_items,
        customer: {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
        },
        shipping: {
          name: 'John Doe',
          street: '123 Fake St',
          town_city: 'San Francisco',
          county_state: 'CA',
          postal_zip_code: '94103',
          country: 'US',
        },
        fulfillment: {
          shipping_method: '',
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '94103',
          },
        },
      },
      checkoutToken: null,
      shippingOptions: [],
    };
  },
  watch: {
    cart() {
      this.generateToken();
    },
  },
  mounted() {
    if (this.cart.id) {
      this.generateToken();
    }
  },
  methods: {
    generateToken() {
      this.$commerce.checkout.generateToken(
        this.cart.id,
        { type: 'cart' },
      ).then((result) => {
        this.checkoutToken = result.id;
        this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
      }).catch((error) => {
        console.error(`Token Error: ${error.message}`);
      });
    },
    getShippingMethods(orderKey, country) {
      this.$commerce.checkout.getShippingOptions(orderKey, { country }).then((result) => {
        this.shippingOptions = result;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    captureCheckout() {
      this.$commerce.checkout.capture(
        this.checkoutToken,
        {
          line_items: this.lineItemsSanitized(this.cart.line_items),
          customer: this.fields.customer,
          shipping: this.fields.shipping,
          fulfillment: this.fields.fulfillment,
          payment: this.fields.payment,
        },
      ).then((result) => {
        this.$parent.orderRef = result.customer_reference;
        this.$parent.getCart();
        this.$router.push('/order-confirmation');
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    lineItemsSanitized(lineItems) {
      return lineItems.reduce((data, lineItem) => {
        const item = data;
        let variantData = null;
        if (lineItem.variants.length) {
          variantData = {
            [lineItem.variants[0].variant_id]: lineItem.variants[0].option_id,
          };
        }
        item[lineItem.id] = {
          quantity: lineItem.quantity,
          variants: variantData,
        };
        return item;
      }, {});
    },
  },
};
</script>

<style scoped lang="scss">
    .badge-danger{
      position: absolute;
      right: 22px;
      top: 1px;
    }
    .total{
      padding: .5rem !important;
    }
    .btn{
        margin-top: 32px;
        width: 100%;
    }
    .form-control{
        width: 100%;
    }
    .cart-container{
      border: 1px solid #dad6d3;
      .cart-item{
        position: relative;
        padding:.5rem 0;
        border-bottom: 1px solid #dad6d3;
        &:last-of-type{
          border-bottom: none;
        }
      }
      .thumb-container{
        text-align: center;
        border-right: 1px solid #dad6d3;
      }
      .cart-thumb{
        height: 70px;
      }
      .name{
        font-weight: 600;
      }
      .quantity{
        font-size: 12px;
      }
    }
    .form-control{
      background-color: white;
      &:disabled{
        background-color: #e9ecef;
      }
    }
    h4{
      margin-top: 2rem;
    }
</style>
