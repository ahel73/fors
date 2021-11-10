import '@babel/polyfill';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';

import router from '@/navigation/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';

import { VNode } from 'vue/types/umd';

import { RoutesDictionary, RouteNames } from './navigation/types';

declare module 'vue/types/vue' {
  interface Vue {
    $routeNames: RoutesDictionary;
  }
}

Vue.prototype.$routeNames = RouteNames;

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.use(VueTheMask);

new Vue({
  router,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store,
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
