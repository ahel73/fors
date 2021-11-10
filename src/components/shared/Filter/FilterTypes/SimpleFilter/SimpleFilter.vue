<template>
  <div class="filter-nest">
    <input-component
      v-model="innerValue"
      :clearable="!!innerValue"
      :label="label"
      :type="inputType"
      variant="micro"
      hide-details
    />
    <v-icon
      v-if="deletable"
      @click="handleRemove"
      class="delete-icon"
      size="large"
    >
      mdi-close
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Model } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter } from '@/components/shared/Filter/types';
import { SimpleFilter as SimpleFilterType, SimpleModel, SimpleValue } from './SimpleFilter.types';
import { TextSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import Input from '@/components/shared/inputs/InputComponent.vue';

@Component({
  name: 'simple-filter',
  components: {
    'input-component': Input,
  },
})
export default class SimpleFilter extends FilterType {
  @Model('input', { type: String, default: '' }) readonly value!: string;

  get innerValue(): string {
    return this.value;
  }

  set innerValue(value: string) {
    this.$emit('input', value);
  }

  getModel(filter: FlattenedFilter): SimpleModel {
    const {
      defaultValue = null,
      label = '',
      name,
      valueType,
    } = filter as SimpleFilterType;

    return {
      [name]: {
        name,
        text: label,
        type: FilterTypeNames.SIMPLE_FILTER,
        value: defaultValue,
        valueType,
      },
    };
  }

  getLabel(model: SimpleValue): string {
    const { text, value } = model;

    if (!value) {
      return '';
    }

    return `${text}: ${value}`;
  }

  getValue(model: SimpleValue): TextSearchValue | null {
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
