/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';

describe('Datepicker.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('Default render', () => {
    const component = mount(Datepicker);

    expect(component.get('.v-input')).toBeTruthy();
  });
});
