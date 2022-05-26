import Vue from "vue";
//import Vuetify from 'vuetify/lib/framework';
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FFFFFF",
        secondary: "#ededed",
        accent: "#FF0558",
        background: "#f1ecee",
        info: "#1E1E1E",
      },
      dark: {
        primary: "#1E1E1E",
        background: "#3c3e4d",
        info: "#ededed",
      },
    },

    options: { customProperties: true },
  },
});
