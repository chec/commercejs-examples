<template>
    <div class="about container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Commerce.js</h1>
                <h3>eCommerce development just got easier</h3>
                <br>
                <p>{{merchant.business_description}}</p>
                <!-- eslint-disable-next-line max-len -->
                <p>As developers and designers ourselves, we were tired of using eCommerce platforms that were rigid, bloated and complex to work with. We didn’t like that the customisation of eCommerce sites was seen only for big brands and enterprise developers. Instead, we're creating modern tools for developers of all experience levels and businesses of all sizes.</p><p>The design and structure of our APIs are constantly being tested and critiqued by our own hosted checkouts and product displays on the Chec Platform. This keeps us on the ground level with you as we build our SDKs and APIs.</p>
                <br>
                <!-- eslint-disable-next-line max-len -->
                <a href="https://commercejs.com/">Commerce.js</a>
                <br>
                <br>

                <!-- eslint-disable-next-line max-len -->
                <p>Contact us by email at <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'About',
  props: ['merchant'],
};
</script>
