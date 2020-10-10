<template>
    <div class="cart-wrapper">
        <div class="list-group">
            <li class="list-group-item item-name" v-for="item in items" :key="item.id">
                {{ item.name }} {{ item.price.formatted_with_symbol }}
                <button @click="$emit('remove-from-cart', item.id)">Remove</button>
            </li>
        </div>
    </div>
</template>

<script>
export default {
  props: ['items'],
};
</script>

<style>

</style>
