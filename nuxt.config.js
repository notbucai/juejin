const pkg = require('./package')

module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),

  env: {
    auth: require('./auth.config'),
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
    titleTemplate: "%s - 掘金",
    htmlAttrs: {
      lang: 'zh'
    },
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
    '@/plugins/utils.js',
    '@/plugins/alert',
    { src: '@/plugins/vue-mavon-editor', srr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    // '@nuxtjs/axios',
    // '@nuxtjs/auth'
  ],

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/user/login', method: 'post', propertyName: 'token' },
  //       },
  //       tokenRequired: true,
  //       tokenType: 'bearer'
  //     }
  //   }
  // },
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
    analyze: {
      analyzerMode: 'static'
    },
    extend(config, ctx) {

    }
  }
}
