// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL_API ?? false,
    }
  },

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
