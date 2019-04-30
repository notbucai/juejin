const pkg = require('./package')


module.exports = {
  mode: 'universal',

  env: {
    db: {
      "url": "mongodb://localhost:27017/",
      "dbName": "juejin"
    }
  },

  router: {
    middleware: 'redirect',
    extendRoutes(routes, resolve) {
      // 啥都不行。。。
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    './assets/css/global.scss',
    // '~animate.css'
    "animate.css/animate.min.css"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/directive.js',
    '@/plugins/axios.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: '@/assets/css/common.scss',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
