// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules : [
    '@pinia/nuxt',
  ],

  // dev tools
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  // Client side rendering only
  ssr: false,

  // Env configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL_API ?? false,
    }
  },

  // Style configuration
  css : ['~/assets/scss/global.scss'],

  vite: {

    css: {

      preprocessorOptions : {

        scss : {

          additionalData : '@use "~/assets/scss/portable/portable.scss" as *;'

        }

      }

    }

  }

})