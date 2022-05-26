import Vue from 'vue';
//import Vuetify from 'vuetify/lib/framework';
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        light: {
            primary: '#f1ecee',
            secondary: '#3c3e4d',
            accent: '#FF0558',
            background: '#f1ecee'
        },
        dark : {
            primary: '#3c3e4d',
            background: '#3c3e4d',
            fader: '#3c3e4d',
        }
    },
});
