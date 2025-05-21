import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vue from "@vitejs/plugin-vue";
import { parseConfigValue } from "./utils/config-parser.js";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // vue: {
  //   config: {
  //     devtools: false,
  //   },
  // },

  extractCSS: {
    ignoreOrder: true
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|vue)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  app:{
    head:{
      title:"Dappetize - Decentralized App Store",
      link:[
        {rel: "icon", type: 'image/svg+xml', href: "/favIcon.svg"}
      ],
      meta: [
        {
          httpEquiv: "Content-Security-Policy",
          content: "upgrade-insecure-requests"
        },
      ],
    }
  },

  devtools: { enabled: true },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },

    "nuxt-swiper",
    "@pinia/nuxt",
  ],

  plugins: ["~/plugins/wallet-connect", "~/plugins/auth.js"],

  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },

  pinia: {
    storesDirs: [
      "./stores/**",
      // ,'./custom-folder/stores/**'
    ],
  },

  runtimeConfig: {
    // Private keys are only available on the server
    // usage: config.apiSecret
    // apiSecret: process.env.hostName,

    // Public keys that are exposed to the client
    // usage: config.public.apiBase
    public: {
      IsHttps: parseConfigValue(process.env.IsHttps),
      hostName: parseConfigValue(process.env.hostName),
      frontendHostName: parseConfigValue(process.env.frontendHostName),
      baseURL: parseConfigValue(process.env.baseURL),
      fileURL: parseConfigValue(process.env.fileURL),
      frontendURL: parseConfigValue(process.env.frontendURL),
      filePort: parseConfigValue(process.env.filePort),
      backendPort: parseConfigValue(process.env.backendPort),
      uiPort: parseConfigValue(process.env.uiPort),

      gatewayWS: parseConfigValue(process.env.gatewayWS),
      wsPort: parseConfigValue(process.env.wsPort),
    },
  },

  compatibilityDate: "2025-01-10",
});