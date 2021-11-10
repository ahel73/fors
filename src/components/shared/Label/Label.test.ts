/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, shallowMount } from '@vue/test-utils';
import LabelComponent from '@/components/shared/Label/Label.vue';

describe('LabelComponent.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('Default render', () => {
    const component = shallowMount(LabelComponent, {
      propsData: { filters: {} },
    });

    expect(component.get('div')).toBeTruthy();
  });

  it('Label render', () => {
    const label = 'label';

    const component = mount(LabelComponent, {
      propsData: { label },
    });

    expect(component.find('.label').text()).toEqual(label);
  });
});
