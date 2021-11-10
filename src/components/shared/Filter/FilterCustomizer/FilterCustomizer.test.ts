/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import { FilterTypeNames, FilterTypes, ValueTypes } from '@/components/shared/Filter/types';
import FilterCustomizer from '@/components/shared/Filter/FilterCustomizer/FilterCustomizer.vue';

describe('FilterDialog.vue', () => {
  const customFilters: FilterTypes = {
    simpleFilters: [
      {
        name: 'test name',
        isCustom: true,
        valueType: ValueTypes.STRING,
        type: FilterTypeNames.SIMPLE_FILTER,
      },
    ],
  };

  beforeEach(() => {
    Vue.use(Vuetify);
  });

  it('customFilters render', () => {
    const component = mount(FilterCustomizer, {
      data: () => ({
        isDialogOpen: true,
      }),
      propsData: {
        filters: customFilters,
        onChoose: jest.fn(),
        onReset: jest.fn(),
      },
      created() {
        (this.$vuetify.lang as any) = {
          t: (): string => '',
        };
        (this.$vuetify.theme as any) = {
          t: (): string => '',
        };
      },
    });

    expect(component.findAll('input').length).toEqual(1);
  });
});
