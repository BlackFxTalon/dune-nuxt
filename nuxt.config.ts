export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true
  },
  nitro: {
    experimental: {
      openAPI: false
    }
  },
  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  }
})
