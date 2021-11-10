<template>
  <checkbox-component
    v-model="innerValue"
    :label="label"
    hide-details
    class="pa-0"
  >
    <template #append>
      <v-icon
        v-if="deletable"
        @click="handleRemove"
        size="large"
      >
        mdi-close
      </v-icon>
    </template>
  </checkbox-component>
</template>

<script lang="ts">
import { Component, Model } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter } from '@/components/shared/Filter/types';
import { CheckboxSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import { CheckboxSimpleFilter as CheckboxSimpleFilterType, CheckboxSimpleModel, CheckboxSimpleValue } from './CheckboxSimpleFilter';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';

@Component({
  name: 'checkbox-simple-filter',
  components: {
    CheckboxComponent,
  },
})
export default class CheckboxSimpleFilter extends FilterType {
  @Model('change', { type: Boolean, default: false }) readonly value!: boolean;

  get innerValue(): boolean {
    return this.value;
  }

  set innerValue(value: boolean) {
    this.$emit('change', value);
  }

  getModel(filter: FlattenedFilter): CheckboxSimpleModel {
    const {
      defaultValue = null,
      label = '',
      name,
      valueType,
    } = filter as CheckboxSimpleFilterType;

    return {
      [name]: {
        name,
        text: label,
        type: FilterTypeNames.CHECKBOX_SIMPLE_FILTER,
        value: defaultValue,
        valueType,
      },
    };
  }

  getLabel(model: CheckboxSimpleValue): string {
    const { text, value } = model;

    if (!value) {
      return '';
    }

    return text;
  }

  getValue(model: CheckboxSimpleValue): CheckboxSearchValue | null {
    const { name, value, valueType } = model;
    const { negative, like } = this;

    if (!value) {
      return null;
    }

    return {
      like,
      name,
      negative,
      type: FilterOutputTypes.SIMPLE_FILTER_ITEM,
      value: [value.toString()],
      valueType,
    };
  }
}
</script>
