<template>
  <div class="filter-nest">
    <datepicker
      v-model="innerValue"
      :output-format="outputFormat"
      :label="label"
      :limit-from="limitFrom"
      :limit-to="limitTo"
      :placeholder="placeholder"
      :view-format="viewFormat"
      variant="micro"
      hide-details
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
import { Component, Model, Prop } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter, ValueTypes } from '@/components/shared/Filter/types';
import { RangeDateFilter as RangeDateFilterType, RangeDateModel, RangeDateValue } from './RangeDateFilter.types';
import { RangeSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';

import { getRangeLabels } from '@/utils';

@Component({
  name: 'range-date-filter',
  components: {
    Datepicker,
  },
})
export default class RangeDateFilter extends FilterType {
  @Model('change', { type: String }) readonly value!: string;

  @Prop({ type: String, default: 'YYYY-MM-DD' }) readonly outputFormat!: string;
  @Prop({ type: String, default: 'DD-MM-YYYY' }) readonly viewFormat!: string;
  @Prop({ type: String, default: '' }) readonly limitFrom!: string;
  @Prop({ type: String, default: '' }) readonly limitTo!: string;

  get innerValue(): string {
    return this.value;
  }

  set innerValue(value: string) {
    this.$emit('change', value);
  }

  getModel(filter: FlattenedFilter): RangeDateModel {
    const {
      from,
      label,
      name,
      to,
    } = filter as RangeDateFilterType;

    return {
      [name]: {
        name,
        label: label || '',
        type: FilterTypeNames.RANGE_DATE_FILTER,
        valueType: ValueTypes.DATE,
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

  getLabel(model: RangeDateValue): string {
    const { label, from, to } = model;

    return getRangeLabels(label, from.value ?? '', to.value ?? '');
  }

  getValue(model: RangeDateValue): RangeSearchValue | null {
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
