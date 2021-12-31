<template>
  <div>
    <template
      v-for="filter in filters"
    >
      <v-row
        v-if="filter.type === 'RANGE_DATE_FILTER' && filter.label"
        class="pl-3 pt-3"
        :key="filter.label"
      >
        <label-component
          :label="filter.label"
        />
      </v-row>
      <v-row
        :key="filter.name"
      >
        <v-col v-if="filter.type === 'MULTI_FILTER'">
          <multi-filter
            @input="(value) => setValue(value, filter.name, filter.type)"
            @onRemove="handleRemove"
            :deletable="filter.isCustom"
            :label="filter.label"
            :like="filter.like"
            :name="filter.name"
            :negative="filter.negative"
            :value="getValue(filter.name)"
            :value-type="filter.valueType"
            :ref="filter.type"
          />
        </v-col>
        <v-col v-if="filter.type === 'SIMPLE_FILTER'">
          <simple-filter
            @input="(value) => setValue(value, filter.name, filter.type)"
            @onRemove="handleRemove"
            :deletable="filter.isCustom"
            :label="filter.label"
            :like="filter.like"
            :name="filter.name"
            :negative="filter.negative"
            :value-type="filter.valueType"
            :value="getValue(filter.name)"
            :ref="filter.type"
          />
        </v-col>
        <v-col
          v-if="filter.type === 'CHECKBOX_SIMPLE_FILTER'"
          class="d-inline-flex"
        >
          <checkbox-simple-filter
            @change="(value) => setValue(value, filter.name, filter.type)"
            @onRemove="handleRemove"
            :deletable="filter.isCustom"
            :label="filter.label"
            :like="filter.like"
            :name="filter.name"
            :negative="filter.negative"
            :value="getValue(filter.name)"
            :value-type="filter.valueType"
            :ref="filter.type"
          />
        </v-col>
        <v-col v-if="filter.type === 'SELECT_FILTER'">
          <select-filter
            @change="(value) => setValue(value, filter.name, filter.type)"
            @onRemove="handleRemove"
            :chips="filter.multiple"
            :deletable-chips="filter.multiple"
            :deletable="filter.isCustom"
            :items-length="filter.itemsLength"
            :items="filter.items"
            :label="filter.label"
            :like="filter.like"
            :multiple="filter.multiple"
            :show-code="filter.showCode"
            :show-hierarchy="filter.showHierarchy"
            :name="filter.name"
            :negative="filter.negative"
            :no-filter="filter.noFilter"
            :on-page-change="filter.onPageChange"
            :on-enter="filter.onEnter"
            :on-search-input-update="filter.onSearchInputUpdate"
            :search-mode="filter.searchMode"
            :value="getValue(filter.name)"
            :ref="filter.type"
          />
        </v-col>
        <template v-if="filter.type === 'RANGE_SIMPLE_FILTER'">
          <v-col
            cols="6"
            class="d-flex align-end"
          >
            <div class="input-wrapper">
              <range-simple-filter
                @input="(value) => setValue(value, `${filter.name}.from`, filter.type)"
                :label="filter.from.label"
                :like="filter.like"
                :name="filter.name"
                :negative="filter.negative"
                :type="filter.from.type"
                :value="getValue(`${filter.name}.from`)"
                :value-type="filter.valueType"
                :ref="filter.type"
              />
            </div>
          </v-col>
          <v-col
            cols="6"
            class="d-flex align-end"
          >
            <div class="input-wrapper">
              <range-simple-filter
                @input="(value) => setValue(value, `${filter.name}.to`, filter.type)"
                @onRemove="handleRemove"
                :deletable="filter.isCustom"
                :label="filter.to.label"
                :like="filter.like"
                :name="filter.name"
                :negative="filter.negative"
                :type="filter.to.type"
                :value="getValue(`${filter.name}.to`)"
                :value-type="filter.valueType"
                :ref="filter.type"
              />
            </div>
          </v-col>
        </template>
        <template v-if="filter.type === 'RANGE_DATE_FILTER'">
          <v-col
            cols="6"
            class="d-flex align-end"
          >
            <div class="input-wrapper">
              <range-date-filter
                @change="(value) => setValue(value, `${filter.name}.from`, filter.type)"
                :label="filter.from.label"
                :like="filter.like"
                :limit-to="getValue(`${filter.name}.to`)"
                :name="filter.name"
                :negative="filter.negative"
                :output-format="filter.from.outputFormat"
                :type="filter.from.type"
                :value="getValue(`${filter.name}.from`)"
                :view-format="filter.from.viewFormat"
                :ref="filter.type"
              />
            </div>
          </v-col>
          <v-col
            cols="6"
            class="d-flex align-end"
          >
            <div class="input-wrapper">
              <range-date-filter
                @change="(value) => setValue(value, `${filter.name}.to`, filter.type)"
                @onRemove="handleRemove"
                :deletable="filter.isCustom"
                :label="filter.to.label"
                :like="filter.like"
                :limit-from="getValue(`${filter.name}.from`)"
                :name="filter.name"
                :negative="filter.negative"
                :output-format="filter.to.outputFormat"
                :type="filter.to.type"
                :value="getValue(`${filter.name}.to`)"
                :view-format="filter.to.viewFormat"
                :ref="filter.type"
              />
            </div>
          </v-col>
        </template>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import eventBus from '@/utils/bus/event-bus';
import getPath from 'lodash/get';
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import { FilterTypeNamesKeys, FlattenedFilter } from '@/components/shared/Filter/types';
import { FilterRef, Models } from './Filters.types';
import { OutputFilterLabels, OutputFilters, OutputFilterValues, RangeSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import { SimpleRangeValue } from '../FilterTypes/RangeSimpleFilter/RangeSimpleFilter.types';
import { RangeDateValue } from '../FilterTypes/RangeDateFilter/RangeDateFilter.types';
import CheckboxSimpleFilter from '@/components/shared/Filter/FilterTypes/CheckboxSimpleFilter/CheckboxSimpleFilter.vue';
import MultiFilter from '@/components/shared/Filter/FilterTypes/MultiFilter/MultiFilter.vue';
import RangeDateFilter from '@/components/shared/Filter/FilterTypes/RangeDateFilter/RangeDateFilter.vue';
import RangeSimpleFilter from '@/components/shared/Filter/FilterTypes/RangeSimpleFilter/RangeSimpleFilter.vue';
import SelectFilter from '@/components/shared/Filter/FilterTypes/SelectFilter/SelectFilter.vue';
import SimpleFilter from '@/components/shared/Filter/FilterTypes/SimpleFilter/SimpleFilter.vue';
import { SelectItem, SelectValue } from '@/components/shared/Filter/FilterTypes/SelectFilter/SelectFilter.types';
import LabelComponent from '@/components/shared/Label/Label.vue';

import { isRangeFilter } from '@/utils';

@Component({
  name: 'filters',
  components: {
    CheckboxSimpleFilter,
    MultiFilter,
    RangeDateFilter,
    RangeSimpleFilter,
    SelectFilter,
    SimpleFilter,
    LabelComponent,
  },
})
export default class Filters extends Vue {
  @Prop(Array) filters!: FlattenedFilter[];
  @Prop(Array) initialItems!: OutputFilters;

  models: Models = {};

  setModels(): void {
    this.$nextTick(() => {
      for (const filter of this.filters) {
        const { name, names, type } = filter;

        const ref = (this.$refs as FilterRef)[type as FilterTypeNamesKeys];
        // eslint-disable-next-line no-mixed-operators
        const filterByName = ref.find((ref) => isEqual(ref.name, name) || isEqual(ref.names, names) && names);

        if (filterByName) {
          // eslint-disable-next-line no-mixed-operators
          const currentModel = this.initialItems.find(item => isEqual(item.name, name) || isEqual(item.names, names) && names);
          Vue.set(this.models, name as string, { ...filterByName.getModel(filter)[name as string] });
          if (currentModel) {
            const value = currentModel.type === 'RangeFilterItem' ? currentModel : currentModel.value;
            const path = currentModel.names ? 'search' : currentModel.name as string;

            this.setValue(value, path, filter.type as string);
          }
        }
      }
    });
  }

  getLabels(): OutputFilterLabels {
    return reduce<Models, OutputFilterLabels>(this.models, (labels, model) => {
      const { type, name } = model;
      const ref = (this.$refs as FilterRef)[type];
      const filterByName = ref.find((ref) => ref.name === name);

      if (filterByName) {
        const label = filterByName.getLabel(model);
        return (label && [...labels, label]) || labels;
      }
      return labels;
    }, []);
  }

  getValues(): OutputFilterValues {
    return reduce<Models, OutputFilterValues>(this.models, (values, model) => {
      const { type, name } = model;
      const ref = (this.$refs as FilterRef)[type];
      const filterByName = ref.find((ref) => ref.name === name);

      if (filterByName) {
        const value = filterByName.getValue(model);
        return (value && [...values, value]) || values;
      }
      return values;
    }, []);
  }

  getRangeValue(rangeValue: RangeSearchValue, item: 'valueFrom' | 'valueTo'): string | null {
    return !isNil(rangeValue[item]) ? `${rangeValue[item]}` : null;
  }

  setValue(
    value: string | (string | number | boolean | null)[] | SelectItem[] | RangeSearchValue,
    path: string,
    type: string
  ): void {
    const field = getPath(this.models, path);

    if (field) {
      if (type === 'SELECT_FILTER' && isArray(value) && (field as SelectValue).multiple) {
        const currentSelect = this.filters.find(filter => {
          return filter.name === path;
        });
        if (currentSelect) {
          const totalValues: SelectItem[] = [];
          value.forEach((currentValue: string | number | boolean | null | SelectItem) => {
            totalValues.push(currentSelect.items?.find(item => {
              return typeof currentValue === 'object' ? item.value === currentValue?.value : item.value === currentValue;
            }) as SelectItem);
          });
          (field as SelectValue).value = totalValues;
        }
      } else if (isRangeFilter(type)) {
        const rangePath = path.split('.').filter(item => item === 'to' || item === 'from');

        if (!rangePath.length) {
          const { from, to } = field as SimpleRangeValue | RangeDateValue;
          from.value = this.getRangeValue(value as RangeSearchValue, 'valueFrom');
          to.value = this.getRangeValue(value as RangeSearchValue, 'valueTo');
        } else if (field.name === rangePath.toString()) {
          field.value = value as string;
        }
      } else if (type === 'SIMPLE_FILTER' && isArray(value)) {
        const [item] = value as SelectItem[];
        field.value = item.value as string | null;
      } else if (isString(value)) {
        field.value = value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (field as any).value = isArray(value) ? value[0] : value;
      }
    }
  }

  getValue(path: string): unknown | null {
    const field = getPath(this.models, path);

    if (field) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (field as any).value;
    }
    return null;
  }

  handleRemove(name: string): void {
    this.$emit('onRemove', name);
  }

  resetModels(): void {
    this.models = {};
    this.setModels();
  }

  mounted(): void {
    this.setModels();
  }

  @Watch('filters', { deep: true })
  onFiltersChange(): void {
    this.setModels();
  }

  @Watch('models', { deep: true })
  onModelsChange(): void {
    eventBus.$emit('filterChange', this.models);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  .input-wrapper {
    width: 100%;
  }
</style>
