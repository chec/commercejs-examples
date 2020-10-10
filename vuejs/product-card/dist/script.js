const commerce = new Commerce('pk_17695092cf047ebda22cd36e60e0acbe5021825e45cb7', true);

new Vue({
  el: '#app',
  data() {
    return {
      products: '' };

  },

  created() {
    // Make a request to list products
    commerce.products.list('prod_1ypbroE658n4ea').
    then(resp => {
      //"id": "prod_1ypbroE658n4ea"
      // Respond with product data upon a successful request
      this.products = resp.data;
    })
    // Handle Error
    .catch(error => {
      // eslint-disable-next-line
      console.log(error);
    });
  } });