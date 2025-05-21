import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
// Translations provided by Vuetify
import { en, fa } from "vuetify/locale";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark'
    },
    locale: {
      locale: "en",
      fallback: "en",
      messages: { en, fa },
    },
    treeShake: false, // Disable tree-shaking in production

  });
  app.vueApp.use(vuetify);
});
