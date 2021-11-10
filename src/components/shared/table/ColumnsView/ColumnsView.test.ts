/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ColumnsView from '@/components/shared/table/ColumnsView/ColumnsView.vue';

describe('ColumnsView.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('Default render', () => {
    const component = mount(ColumnsView);

    expect(component.get('div')).toBeTruthy();
  });
});
