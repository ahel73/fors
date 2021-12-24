<template>
  <div class="d-flex">
    <autocomplete-component
      v-model="innerValue"
      @onPageChange="onPageChange"
      @onEnter="onEnter"
      @searchInputUpdate="onSearchInputUpdate"
      :chips="chips"
      :deletable-chips="deletableChips"
      :is-multiple="multiple"
      :items-length="itemsLength"
      :items="items"
      :label="label"
      :no-filter="noFilter"
      :per-page="200"
      :search-mode="searchMode"
      variant="micro"
      clearable
      hide-details
      return-object
      class="flex-grow-1"
    >
      <template
        v-if="showCode || showHierarchy"
        #item="{ item }"
      >
        <template v-if="showCode">
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
            <v-list-item-subtitle v-text="item.code" />
          </v-list-item-content>
        </template>
        <template v-if="showHierarchy">
          <template v-if="!item.parent">
            <v-list-item-content v-text="item.text" />
          </template>
          <template v-else>
            <v-list-item-icon>
              <v-icon>
                mdi-cirle-small
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
              <v-list-item-subtitle v-text="item.parent.name" />
            </v-list-item-content>
          </template>
        </template>
      </template>
    </autocomplete-component>
    <v-icon
      v-if="deletable"
      @click="handleRemove"
      class="flex-grow-0 pt-6 pl-1"
      size="large"
    >
      mdi-close
    </v-icon>
  </div>
</template>

<script lang="ts">
import flatMap from 'lodash/flatMap';
import { Component, Model, Prop } from 'vue-property-decorator';
import { FilterOutputTypes, FilterTypeNames, FlattenedFilter } from '@/components/shared/Filter/types';
import { SelectFilter as SelectFilterType, SelectModel, SelectItem, SelectValue } from './SelectFilter.types';
import { SelectSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import FilterType from '@/components/shared/Filter/FilterTypes/FilterType';
import AutocompleteComponent from '@/components/shared/inputs/AutocompleteComponent.vue';
import { isArray } from 'lodash';

@Component({
  name: 'select-filter',
  components: {
    AutocompleteComponent,
  },
})
export default class SelectFilter extends FilterType {
  @Model('change', { type: [Array, Object] }) readonly value!: SelectItem;

  @Prop({ type: Array, default: () => [] }) readonly items!: string;
  @Prop(Boolean) readonly chips!: boolean;
  @Prop(Boolean) readonly deletableChips!: boolean;
  @Prop(Boolean) readonly multiple!: boolean;
  @Prop(Boolean) readonly showCode!: boolean;
  @Prop(Boolean) readonly showHierarchy!: boolean;
  @Prop(Boolean) readonly noFilter!: boolean;
  @Prop(Boolean) readonly searchMode!: boolean;
  @Prop(Number) readonly itemsLength!: number;
  @Prop({ type: Function, default: () => ({}) }) readonly onPageChange!: (page: number, perPage: number, value: string) => void;
  @Prop({ type: Function, default: () => ({}) }) readonly onEnter!: (value: string) => void;
  @Prop({ type: Function, default: () => ({}) }) readonly onSearchInputUpdate!: (searchValue: string) => void;

  get innerValue(): SelectItem {
    return this.value;
  }

  set innerValue(value: SelectItem) {
    this.$emit('change', value);
  }

  getModel(filter: FlattenedFilter): SelectModel {
    const {
      defaultValue = null,
      label = '',
      multiple,
      name,
      valueType,
    } = filter as SelectFilterType;

    return {
      [name]: {
        name,
        multiple,
        text: label,
        type: FilterTypeNames.SELECT_FILTER,
        value: defaultValue,
        valueType,
      },
    };
  }

  getLabel(model: SelectValue): string {
    const { value, text } = model;

    if (!value) {
      return '';
    }

    const labels = isArray(value) ? flatMap(value, ({ text }) => ` ${text}`) : value.text;

    if (!labels.length) {
      return '';
    }

    return `${text}: ${labels}`;
  }

  getValue(model: SelectValue): SelectSearchValue | null {
    const { name, value, valueType } = model;
    const { negative, like } = this;
    const baseSelect = {
      like,
      name,
      negative,
      type: FilterOutputTypes.SIMPLE_FILTER_ITEM,
      valueType,
    };

    if (!value) {
      return null;
    }

    return {
      ...baseSelect,
      value: isArray(value) ? value : [value],
    };
  }
}
</script>

<style scoped lang="scss">
  .d-flex::v-deep {

    .v-select.v-select--chips {

      .v-select__selections {
        min-height: auto;
      }
    }
  }
</style>
