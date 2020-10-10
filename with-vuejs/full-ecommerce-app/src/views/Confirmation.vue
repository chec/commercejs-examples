<template>
    <div class="about container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Thank you!</h1>
                <h3>Your order has been received</h3>
                <p><strong>Order Reference:</strong> {{orderRef}}</p>
                <br>
                <!-- eslint-disable-next-line max-len -->
                <p>Contact us by email at <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Confirmation',
  props: ['orderRef', 'merchant'],
};
</script>
