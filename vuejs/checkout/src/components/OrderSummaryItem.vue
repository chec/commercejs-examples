<template>
    <div class="d-flex justify-content-between">
        <div>
            <h6>{{ item.product_name }}</h6>
            <p>Quantity: {{ item.quantity }}</p>
        </div>
        <p>{{ item.line_total.formatted_with_symbol }}</p>
    </div>
</template>

<script>
export default {
    name: "OrderSummaryItem",
    props: ["item"]
}
</script>

<style>
</style>