<template>
  <div class="filter-nest">
    <input-component
      v-model="innerValue"
      v-mask="'####################'"
      :label="label"
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
import { mask } from 'vue-the-mask';
import { Component, Model } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter } from '@/components/shared/Filter/types';
import { RangeSimpleFilter as RangeSimpleFilterType, RangeSimpleModel, SimpleRangeValue } from './RangeSimpleFilter.types';
import { RangeSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import Input from '@/components/shared/inputs/InputComponent.vue';

type InputValue = number | string;

@Component({
  name: 'range-simple-filter',
  directives: { mask },
  components: {
    'input-component': Input,
  },
})
export default class RangeSimpleFilter extends FilterType {
  @Model('input', { type: [Number, String] }) readonly value!: InputValue;

  get innerValue(): InputValue {
    return this.value?.toString();
  }

  set innerValue(value: InputValue) {
    this.$emit('input', value);
  }

  getModel(filter: FlattenedFilter): RangeSimpleModel {
    const {
      from,
      label = '',
      name,
      to,
      valueType,
    } = filter as RangeSimpleFilterType;

    return {
      [name]: {
        name,
        label: label,
        type: FilterTypeNames.RANGE_SIMPLE_FILTER,
        valueType,
        from: {
          name: from.name,
          value: from.defaultValue || null,
        },
        to: {
          name: to.name,
          value: to.defaultValue || null,
        },
      },
    };
  }

  getLabel(model: SimpleRangeValue): string {
    const { from, label, to } = model;

    if (from.value && to.value) {
      return `${label}: c ${from.value} по ${to.value}`;
    } else if (from.value) {
      return `${label}: c ${from.value}`;
    } else if (to.value) {
      return `${label}: по ${to.value}`;
    }

    return '';
  }

  getValue(model: SimpleRangeValue): RangeSearchValue | null {
    const { name, from, to, valueType } = model;
    const { negative, like } = this;
    const baseRange = {
      like,
      name,
      negative,
      type: FilterOutputTypes.RANGE_FILTER_ITEM,
      valueType,
    };

    if (from.value && to.value) {
      return {
        ...baseRange,
        valueFrom: [from.value],
        valueTo: [to.value],
      };
    } else if (from.value) {
      return {
        ...baseRange,
        valueFrom: [from.value],
      };
    } else if (to.value) {
      return {
        ...baseRange,
        valueTo: [to.value],
      };
    }

    return null;
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
