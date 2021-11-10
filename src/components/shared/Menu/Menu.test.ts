/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Menu from '@/components/shared/Menu/Menu.vue';

describe('Menu.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('Default render', () => {
    const component = mount(Menu);

    expect(component.get('div')).toBeTruthy();
  });
});
