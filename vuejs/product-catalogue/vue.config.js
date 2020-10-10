module.exports = {

  publicPath: '/commercejs-demo/',

  css: {
    loaderOptions: {
      sass: {
        prependData:
                `@import "@/styles/_variables.scss";
                @import "@/styles/_mixins.scss";`,
      },
    },
  },
};
