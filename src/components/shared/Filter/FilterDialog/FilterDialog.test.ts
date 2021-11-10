/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import { FilterTypeNames, FilterTypes, ValueTypes } from '@/components/shared/Filter/types';
import FilterDialog from '@/components/shared/Filter/FilterDialog/FilterDialog.vue';

describe('FilterDialog.vue', () => {
  let filters: FilterTypes = {};

  beforeEach(() => {
    Vue.use(Vuetify);

    filters = {
      simpleFilters: [
        {
          name: 'test name 1',
          isDefault: true,
          valueType: ValueTypes.STRING,
          type: FilterTypeNames.SIMPLE_FILTER,
        },
        {
          name: 'test name 2',
          isDefault: true,
          isCustom: true,
          valueType: ValueTypes.STRING,
          type: FilterTypeNames.SIMPLE_FILTER,
        },
      ],
    };
  });

  it('defaultFilters render', () => {
    const component = mount(FilterDialog, {
      propsData: {
        filters,
      },
      created() {
        (this.$vuetify.lang as any) = {
          t: (): string => '',
        };
      },
    });

    expect(component.findAll('input').length).toEqual(2);
  });

  it('defaultFilters restore', () => {
    const component = mount(FilterDialog, {
      propsData: {
        filters,
      },
      created() {
        (this.$vuetify.lang as any) = {
          t: (): string => '',
        };
      },
    });

    component.find('.restore-button').trigger('click');

    Vue.nextTick(() => {
      expect(component.findAll('input').length).toEqual(1);
    });
  });
});
