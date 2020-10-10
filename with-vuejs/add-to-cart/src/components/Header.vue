<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/cart">Cart</router-link>
    </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
nav a {
    margin-right: 10px;
}
</style>

