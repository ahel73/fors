<template>
  <div :style="{ width }">
    <div v-if="label">
      <label-component
        :label="label"
        :show-icon="required"
      />
    </div>
    <v-autocomplete
      v-model="innerValue"
      @click="onClick"
      @change="onChange"
      @focus="onFocus"
      @blur="handleBlur"
      @keydown="paginationWithSearch = true"
      @keydown.enter.prevent="onEnter"
      @update:search-input="onSearchInputUpdate"
      :class="[variant, { chips }]"
      :cache-items="cacheItems"
      :chips="chips"
      :clearable="clearable"
      :color="color"
      :dense="dense"
      :disable-lookup="disableLookup"
      :disabled="disabled"
      :error-messages="errorMessages"
      :error="error"
      :hide-details="hideDetails"
      :hide-selected="hideSelected"
      :item-text="itemText"
      :item-value="itemValue"
      :item-disabled="itemDisabled"
      :items="innerList"
      :filter="filter"
      :loading="loading"
      :menu-props="{
        contentClass,
        ...selectMenuProps,
      }"
      :messages="messages"
      :multiple="isMultiple"
      :no-data-text="noDataText"
      :no-filter="noFilter"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      :return-object="returnObject"
      :rules="rules"
      :search-input.sync="searchInputValue"
      :small-chips="smallChips"
      :solo="solo"
      auto-grow
    >
      <template
        v-for="(_, name) in $scopedSlots"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
      <template #prepend-item>
        <slot
          v-if="isPaginationShown"
          name="pagination"
        >
          <select-pagination
            @onPageChange="handlePageChange"
            :per-page="perPage"
            :items-length="itemsLength"
            class="pagination"
          />
        </slot>
        <slot
          v-if="isMultiple"
          name="all-selection"
        >
          <all-selection
            v-model="innerValue"
            @selectAllToggle="handleSelectAllToggle"
            :items="items"
          />
        </slot>
      </template>
      <template
        v-if="chips || tooltip"
        #selection="{ attrs, item, index, parent }"
      >
        <v-chip
          v-if="chips && index <= chipsToShow - 1"
          @click:close="parent.onChipInput(item)"
          active-class="chip"
          close-icon="mdi-close"
          color="#D19B3F"
          text-color="#FFFFFF"
          v-bind="attrs"
          close
          large
          label
        >
          {{ parseName(item) }}
        </v-chip>
        <span
          v-if="index === chipsToShow"
        >
          (+{{ innerValue.length - chipsToShow }} ещё)
        </span>
        <v-tooltip
          top
          max-width="500"
          open-delay="500"
        >
          <template #activator="{ on, activatorAttrs }">
            <span
              v-if="tooltip"
              v-on="on"
              v-bind="activatorAttrs"
              class="hint_span"
            >
              {{ parseName(item) }}
            </span>
          </template>
          {{ parseName(item) }}
        </v-tooltip>
      </template>
      <template #message="{ message }">
        <text-component class="base-micro text-error">
          {{ message }}
        </text-component>
      </template>
      <template #append-outer>
        <icon-component
          v-if="searchMode"
          @click="onEnter"
          class="enter-icon"
        >
          <enter-icon />
        </icon-component>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import isEqual from 'lodash/isEqual';
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import { PageChange } from '@/components/shared/Pagination/Pagination.types';
import AllSelection from '@/components/shared/inputs/AllSelection.vue';
import LabelComponent from '@/components/shared/Label/Label.vue';
import Pagination from '@/components/shared/Pagination/Pagination.vue';
import SelectPagination from '@/components/shared/Pagination/SelectPagination.vue';
import TextComponent from '@/components/shared/Text/Text.vue';
import { isArray, isEmpty, concat, cloneDeep } from 'lodash';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import EnterIcon from '@/components/shared/IconComponent/icons/EnterIcon.vue';

export interface ObjectValue {
  [key: string]: unknown;
}

export type Value = number | string[] | ObjectValue[] | string | ObjectValue;

export type AutocompleteItem<T = Value> = {
  text?: string | number;
  value?: T;
}

export type SelectMenuProps = {
  [key: string]: number | string | boolean;
}

@Component({
  name: 'autocomplete-component',
  components: {
    AllSelection,
    LabelComponent,
    Pagination,
    SelectPagination,
    TextComponent,
    IconComponent,
    EnterIcon,
  },
})
export default class AutocompleteComponent extends Vue {
  @Model('change', {
    type: [String, Number, Array, Object],
    default: '',
  }) value!: Value;

  @Prop({ type: String, default: 'Данные отсутствуют' }) readonly noDataText!: string;
  @Prop({ type: Array, default: () => [] }) readonly items!: unknown[];
  @Prop({ type: Array, default: () => [] }) readonly rules!: string;
  @Prop({ type: String, default: '' }) readonly label!: string;
  @Prop({ type: String, default: '' }) readonly messages!: string;
  @Prop({ type: String, default: '' }) readonly placeholder!: string;
  @Prop({ type: String, default: '' }) readonly width!: string;
  @Prop({ type: String, default: 'micro' }) readonly variant!: string;
  @Prop({ type: String, default: 'text' }) readonly itemText!: keyof AutocompleteItem;
  @Prop({ type: String, default: 'value' }) readonly itemValue!: keyof AutocompleteItem;
  @Prop({ type: String, default: '#d19b3f' }) readonly color!: string;
  @Prop({ type: [String, Array] }) readonly errorMessages!: string;
  @Prop({ type: Number, default: 200 }) readonly perPage!: number;
  @Prop({ type: Number, default: 2 }) readonly chipsToShow!: number;
  @Prop({ type: Object, default: () => ({}) }) readonly selectMenuProps!: SelectMenuProps;
  @Prop(Boolean) readonly cacheItems!: boolean;
  @Prop(Boolean) readonly chips!: boolean;
  @Prop(Function) readonly chipsTextFormat!: (item: string | AutocompleteItem) => string;
  @Prop(Function) readonly itemDisabled!: (item: string | AutocompleteItem) => boolean;
  @Prop(Boolean) readonly clearable!: boolean;
  @Prop(Boolean) readonly dense!: boolean;
  @Prop(Boolean) readonly disableLookup!: boolean;
  @Prop(Boolean) readonly error!: boolean;
  @Prop(Boolean) readonly hideSelected!: boolean;
  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly isMultiple!: boolean;
  @Prop(Boolean) readonly loading!: boolean;
  @Prop(Boolean) readonly noFilter!: boolean;
  @Prop(Boolean) readonly required!: boolean;
  @Prop(Boolean) readonly requiredMark!: boolean;
  @Prop(Boolean) readonly returnObject!: boolean;
  @Prop(Boolean) readonly returnArray!: boolean;
  @Prop(Boolean) readonly searchMode!: boolean;
  @Prop(Boolean) readonly showValueWithoutItems!: boolean;
  @Prop(Boolean) readonly smallChips!: boolean;
  @Prop(Boolean) readonly solo!: boolean;
  @Prop(Boolean) readonly tooltip!: boolean;
  @Prop(Boolean) readonly hideDetails!: boolean;
  @Prop(Number) readonly itemsLength!: number;
  @Prop(Number) readonly classifierId!: number;
  @Prop(Boolean) readonly readonly!: boolean;
  @Prop(Boolean) readonly resetUnexistingValue!: boolean;
  @Prop({
    type: Function,
    default: (item: unknown, queryText: string, itemText: string) => {
      return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
    },
  }) readonly filter!: (item: unknown, queryText: string, itemText: string) => boolean;

  paginationWithSearch = false;
  inFocus = false;
  currentPage = 0;
  currentSize = 200;

  searchValue = '';
  get searchInputValue(): string {
    return this.searchValue;
  }

  set searchInputValue(value: string) {
    this.searchValue = value ? value.toString() : value;
  }

  get innerList(): unknown {
    if (
      (!isArray(this.value) && !isEmpty(this.value) && this.showValueWithoutItems) ||
      (isArray(this.value) && !isEmpty(this.value[0]) && this.showValueWithoutItems)
    ) {
      let list = cloneDeep(this.items);
      if (!this.isMultiple) {
        list.unshift(isArray(this.value) ? this.value[0] : this.value);
      } else {
        list = concat(this.value, list);
      }
      return list;
    } else {
      return this.items;
    }
  }

  get innerValue(): Value {
    if (Array.isArray(this.value) && this.returnArray) {
      const [firstValue] = this.value;

      return firstValue;
    }
    if (typeof this.value === 'number') this.value.toString();
    return this.value;
  }

  set innerValue(value: Value) {
    this.$emit('change', this.returnArray ? [value] : value);
  }

  get isPaginationShown(): boolean {
    return this.itemsLength > this.perPage;
  }

  get contentClass(): string {
    const { variant } = this;

    return `autocomplete-menu ${variant}`;
  }

  get complexItemsView(): string | number | unknown | undefined {
    const { innerValue } = this;

    if (Array.isArray(innerValue)) {
      const values = innerValue.map(this.getValue);

      return values.join(', ');
    }

    return this.getValue(innerValue as string);
  }

  get isValueInItems(): boolean {
    // todo возвращается только для того же объекта
    return !!this.items.find((item) => isEqual(item, this.value));
  }

  onFocus(value: Value): void {
    this.inFocus = true;
    this.$emit('onFocus', value);
  }

  handleBlur(value: Value): void {
    this.inFocus = false;
    this.$emit('onBlur', value);
  }

  onSearchInputUpdate(value: Value): void {
    this.$emit('searchInputUpdate', value);
  }

  onChange(value: Value): void {
    this.paginationWithSearch = false;
    this.$emit('onChange', value);
  }

  onClick(value: Value): void {
    if (this.inFocus) {
      this.$emit('onClick', { value, props: this.$props, page: this.currentPage, size: this.currentSize });
    }
  }

  onEnter(): void {
    this.$emit('onEnter', this.searchValue);
  }

  handlePageChange(pageChange: PageChange): void {
    const { page, perPage } = pageChange;
    this.currentPage = page;
    this.currentSize = perPage;

    this.$emit('onPageChange', { page, perPage, value: this.paginationWithSearch ? this.searchValue : '' });
  }

  handleSelectAllToggle(items: AutocompleteItem[]): void {
    this.$emit('change', items);
    this.$emit('selectAllLogically', items.length === this.items.length);
  }

  parseName(item: string | AutocompleteItem): unknown {
    if (this.chipsTextFormat) {
      return this.chipsTextFormat(item);
    }
    if (typeof item === 'object') {
      return item[this.itemText];
    }
    return item;
  }

  getValue(value: string | number | ObjectValue): string | number | unknown | undefined {
    if (typeof value === 'object') {
      return value[this.itemText];
    }
    return value;
  }

  @Watch('items')
  onItemsChange(): void {
    if (!this.value) {
      return;
    }

    if (this.resetUnexistingValue && !this.isValueInItems) {
      this.$emit('change', null);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $accent: map-get($map: $theme-colors, $key: "accent");
  $bright: map-get($map: $theme-colors, $key: "bright");
  $light: map-get($map: $theme-colors, $key: "light");
  $medium: map-get($map: $theme-colors, $key: "medium");
  $primary: map-get($map: $theme-colors, $key: "primary");
  $secondary: map-get($map: $theme-colors, $key: "secondary");
  $white: map-get($map: $theme-colors, $key: "white");

  .v-select.v-select--chips::v-deep {

    .v-select__selections {
      min-height: auto;
    }
  }

  .v-input.v-select::v-deep {

    &.v-text-field {
      margin: 0 !important;
      padding: 0 !important;
    }

    &.v-text-field--solo .v-input__control {
      min-height: auto;
    }

    .v-label {
      color: $light;
    }

    .v-input__slot {
      border: 1px solid $light;
      border-radius: 4px;
      box-shadow: none !important;
      min-height: 0;
      overflow: hidden;
    }

    &--is-menu-active .v-input__slot {
      border-color: $primary;
    }

    &.v-input--is-disabled .v-input__slot {
      background-color: $secondary !important;
      border: 1px solid $secondary;
    }

    &.v-input--is-disabled .v-input__slot span.select_item {
      color: $medium;
    }

    &.small {
      font-size: 22px;
    }

    &.small .v-select__selections {
      line-height: 32px;
    }

    &.micro {
      font-size: 14px;
    }

    &.micro .v-input__slot {
      min-height: 40px;
      padding: 0 12px 0 16px !important;
    }

    &.pico {
      font-size: 11px;
    }

    &.pico .v-input__slot {
      height: 34px;
      padding: 0 10px 0 14px !important;
    }

    &.chips .v-input__slot {
      padding: 2px 14px 2px 2px !important;
    }

    &.chips .v-label {
      padding: 0 14px;
    }

    .v-select__slot {
      height: inherit;
    }

    .v-select__slot .v-input__append-inner .v-icon::before {
      height: 20px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
    }

    .v-select__slot .v-input__append-inner .v-input__icon {
      min-width: 16px;
      width: 16px;
    }

    .v-select__slot .v-input__append-inner .v-input__icon .v-icon::before {
      background-position: center center;
    }

    .v-select__slot .v-input__append-inner .v-input__icon--append .v-icon::before {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 6.89435L8 11.8943L3 6.89435' stroke='%23828286' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      content: "";
    }

    .v-select__slot .v-input__append-inner .v-input__icon--clear .v-icon::before {
      background-image: url("data:image/svg+xml,%3Csvg aria-labelledby='box' height='18' width='18' viewBox='0.512700080871582 0 15.999999046325684 16' role='presentation' fill-rule='evenodd' clip-rule='evenodd' xmlns='http://www.w3.org/2000/svg' class='svg'%3E%3Ctitle id='box' lang='en'%3E box icon %3C/title%3E%3Cg fill='%23828286'%3E%3Cg %3E%3Ccircle cx='8.5127' cy='8' r='8'%3E%3C/circle%3E%3Cpath d='M12.0127 5.1125L11.4002 4.5L8.5127 7.3875L5.6252 4.5L5.0127 5.1125L7.9002 8L5.0127 10.8875L5.6252 11.5L8.5127 8.6125L11.4002 11.5L12.0127 10.8875L9.1252 8L12.0127 5.1125Z' fill='white'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      content: "";
    }

    .v-select__slot .v-input__append-inner {
      align-self: center;
    }

    .v-select__slot .v-input__icon--clear .v-icon.primary--text {
      color: $accent !important;
    }

    .select_chip {
      background-color: $primary;
      border-radius: 4px;
      color: $white;
      font-size: 14px;
      line-height: 16px;
      margin: 2px;
      padding: 12px;
    }

    .v-chip {
      background-color: $primary;
      border-radius: 4px;
      color: $white;
      font-size: 14px;
      height: auto;
      line-height: 16px;
      margin: 2px;
      min-height: 32px;
      padding: 8px;
      white-space: pre-line;
      z-index: 1;
    }

    .select_chip .v-icon {
      color: $white;
    }

    .chip-after {
      color: $light;
      margin-left: 10px;
    }

    .v-chip .v-chip__content {
      white-space: normal;
    }

    .select_item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:not(:first-child) {
        display: none;
      }
    }

    .v-text-field__details {
      padding: 0 !important;
    }

    .v-text-field__details .v-messages__message {
      align-items: center;
      display: flex;
      justify-content: flex-end;
    }

    .v-icon.mdi-menu-down.primary--text {
      color: $accent !important;
    }

    &.error--text .v-input__control .v-input__slot {
      border: 1px solid map-get($theme-colors, "error");
    }

    &.error--text .v-text-field__details .v-messages__message {
      justify-content: flex-start;
    }

    &.error--text .v-text-field__details .v-messages__message .select_helper {
      color: map-get($theme-colors, "error");
      font-size: 12px;
      line-height: 12px
    }

    &.error--text .v-text-field__details .v-messages__message .select_helper .v-icon {
      display: none;
    }
  }

  .pagination {
    padding: 8px 16px;
  }

  .enter-icon {
    background-color: #fff;
    position: absolute;
    right: 20px;
    top: 10px;
  }
</style>

<style lang="scss">
  @import "@/assets/styles/_variables.scss";

  $accent: map-get($map: $theme-colors, $key: "accent");
  $bright: map-get($map: $theme-colors, $key: "bright");
  $light: map-get($map: $theme-colors, $key: "light");
  $white: map-get($map: $theme-colors, $key: "white");

  .autocomplete-menu {
    background: $white;
    border: 1px solid $bright;
    border-radius: 4px;
    box-shadow: 0 16px 32px rgba(35, 39, 51, .1);
    padding: 0;

    &.small .v-list-item__title {
      font-size: 22px;
      line-height: 32px;
    }

    &.micro .v-list-item__title {
      font-size: 14px;
      line-height: 16px;
    }

    &.pico .v-list-item__title {
      font-size: 11px;
      line-height: 16px;
    }

    .v-list {
      padding: 0;
    }

    .v-list-item .v-list-item__content {
      padding: 16px 0;
    }

    .v-list-item--active {
      color: $accent !important;

      &:before {
        opacity: 0 !important;
      }
    }

    .v-list-item .v-simple-checkbox .v-icon .mdi-checkbox-blank-outline {
      color: $light !important;
    }

    .v-list-item .v-simple-checkbox .v-icon .mdi-checkbox-marked {
      color: $accent !important;
    }

    .v-list-item {
      padding: 0 24px 0 16px;

      &:not(:last-child) {
        border-bottom: 1px solid $bright;
      }

      &:hover {
        background-color: $white;
      }

      &:hover .v-list-item__content .v-list-item__title {
        color: $accent !important;
      }

      &:hover:before {
        opacity: 0;
      }
    }
  }

  .v-chip {

    &.v-size--large {
      height: 34px;
      margin-left: 0;
    }
  }
</style>
