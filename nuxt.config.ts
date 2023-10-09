// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    openaiKey: '',
    jwtSecret: '',
    // Keys within public are also exposed client-side
    public: {
    }
  },
  // Use "pages" folder for routes
  pages: true,
  modules: ['@nuxthq/ui'],
  telemetry: false,
})
