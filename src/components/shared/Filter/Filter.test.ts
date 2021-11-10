/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';
import FilterComponent from '@/components/shared/Filter/Filter.vue';

describe('Filter.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('Default render', () => {
    const component = shallowMount(FilterComponent, {
      propsData: { filters: {} },
    });

    expect(component.get('div')).toBeTruthy();
  });
});
