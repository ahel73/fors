<template>
  <div>
    <input-component
      v-model="innerValue"
      :label="label"
      :type="inputType"
      variant="micro"
      hide-details
      clearable
    />
    <v-icon
      v-if="deletable"
      @click="handleRemove"
      size="large"
      class="delete-icon"
    >
      mdi-close
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Model } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter } from '@/components/shared/Filter/types';
import { MultiFilter as MultiFilterType, MultiModel, MultiValue } from './MultiFilter.types';
import { MultiSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import Input from '@/components/shared/inputs/InputComponent.vue';

@Component({
  name: 'multi-filter',
  components: {
    'input-component': Input,
  },
})
export default class MultiFilter extends FilterType {
  @Model('input', { type: String, default: '' }) readonly value!: string;

  get innerValue(): string {
    return this.value;
  }

  set innerValue(value: string) {
    this.$emit('input', value);
  }

  getModel(filter: FlattenedFilter): MultiModel {
    const {
      defaultValue = null,
      label = '',
      name,
      names,
      valueType,
    } = filter as MultiFilterType;

    return {
      [name]: {
        name,
        names,
        text: label,
        type: FilterTypeNames.MULTI_FILTER,
        value: defaultValue,
        valueType,
      },
    };
  }

  getLabel(model: MultiValue): string {
    const { text, value } = model;

    if (!value) {
      return '';
    }

    return `${text}: ${value}`;
  }

  getValue(model: MultiValue): MultiSearchValue | null {
    const { names, value, valueType } = model;
    const { negative, like } = this;

    if (!value) {
      return null;
    }

    return {
      like,
      names,
      negative,
      type: FilterOutputTypes.MULTI_FILTER_ITEM,
      value: [value],
      valueType,
    };
  }
}
</script>

<style scoped lang="scss">
  .filter-nest {
    position: relative;
  }

  .delete-icon {
    bottom: 20px;
    position: absolute;
    right: -10px;
    transform: translate(50%, 50%);
  }
</style>
