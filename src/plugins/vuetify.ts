import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#d19b3f',
        secondary: '#f3f3f3',
        accent: '#be8a32',
        anchor: '#d19b3f',
        success: '#63d149',
        error: '#f44d4d',
      },
    },
  },
});
