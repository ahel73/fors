<template>
  <div
    :style="{ width }"
  >
    <div v-if="label">
      <label-component
        :label="label"
        :show-icon="isRequired"
      />
    </div>
    <v-select
      v-model="innerValue"
      @click="handleClick"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      :class="[variant, { chips }]"
      :chips="chips"
      :clearable="clearable"
      :color="color"
      :deletable-chips="deletableChips"
      :disabled="disabled"
      :hide-details="hideDetails"
      :hide-selected="hideSelected"
      :item-text="itemText"
      :item-value="itemValue"
      :items="items"
      :label="innerLabel"
      :loading="loading"
      :error="error"
      :error-messages="errorMessage"
      :messages="help"
      :multiple="isMultiple"
      :no-data-text="noDataText"
      :placeholder="placeholder"
      :readonly="readonly"
      :return-object="returnObject"
      :rules="rules"
      :menu-props="{
        contentClass,
        maxHeight: hideMenu ? 0 : 400,
        ...selectMenuProps
      }"
      solo
    >
      <template
        v-for="(_, name) in $scopedSlots"
        v-slot:[name]="slotData"
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
      <template #append>
        <icon-component
          v-if="isClearable"
          @click="handleClearClick"
          icon-color="#828286"
        >
          <clear-icon />
        </icon-component>
        <slot name="appendIcon" />
      </template>
      <template #message="{ message }">
        <text-component class="base-micro text-error">
          {{ message }}
        </text-component>
      </template>
      <template
        v-if="isPaginationShown"
        #prepend-inner
      >
        <div>
          <v-chip
            v-for="value in innerValue"
            @click:close="deleteChip(value, innerValue)"
            close
            :key="value[itemValue]"
          >
            <span>{{ value[itemText] }}</span>
          </v-chip>
        </div>
      </template>
      <template
        v-if="isPaginationShown || isMultiple"
        #selection="{ parent, item, index }"
      >
        <v-chip
          v-if="chips && index <= chipsToShow - 1"
          @click:close="parent.onChipInput(item)"
          active-class="chip"
          close-icon="mdi-close"
          color="#D19B3F"
          text-color="#FFFFFF"
          :close="deletableChips"
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
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
/* eslint-disable max-len */
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import { PageChange } from '@/components/shared/Pagination/Pagination.types';
import AllSelection from '@/components/shared/inputs/AllSelection.vue';
import ClearIcon from '@/components/shared/IconComponent/icons/ClearIcon.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import LabelComponent from '@/components/shared/Label/Label.vue';
import SelectPagination from '@/components/shared/Pagination/SelectPagination.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

interface ObjectValue {
  [key: string]: unknown;
}

type Value = string[] | ObjectValue[] | string | ObjectValue;

export type SelectItem<T = Value> = {
  text?: string | number;
  value?: T;
}

export type SelectMenuProps = {
  [key: string]: number | string | boolean;
}

type Variants = 'micro' | 'small' | 'no-borders';

@Component({
  name: 'select-component',
  components: {
    AllSelection,
    ClearIcon,
    IconComponent,
    LabelComponent,
    SelectPagination,
    TextComponent,
  },
})
export default class SelectComponent extends Vue {
  @Model('change', { type: [String, Number, Array, Object] }) readonly value!: Value;

  @Prop({ type: String, default: 'mdi-chevron-down' }) readonly appendIcon!: string;
  @Prop({ type: String, default: 'Данные отсутствуют' }) readonly noDataText!: string;
  @Prop({ type: [String, Function], default: () => 'text' }) readonly itemText!: (item: string | SelectItem) => keyof SelectItem;
  @Prop({ type: [String, Function], default: () => 'value' }) readonly itemValue!: (item: string | SelectItem) => keyof SelectItem;
  @Prop({ type: String, default: 'small' }) readonly variant!: Variants;
  @Prop({ type: Boolean, default: false }) readonly clearable!: boolean;
  @Prop({ type: String, default: 'auto' }) readonly width!: string;
  @Prop({ type: String, default: '#d19b3f' }) color!: string;
  @Prop({ type: Number, default: 200 }) readonly perPage!: number;
  @Prop({ type: Number, default: 2 }) readonly chipsToShow!: number;
  @Prop({ type: Object, default: () => ({}) }) readonly selectMenuProps!: SelectMenuProps;
  @Prop({ type: Array, default: () => [] }) readonly items!: SelectItem[];
  @Prop({ type: Array, default: () => [] }) rules!: string;
  @Prop({ type: Boolean, default: false }) readonly deletableChips!: boolean;
  @Prop(Boolean) readonly chips!: boolean;
  @Prop(String) readonly textAfterChip!: string;
  @Prop(String) readonly placeholder!: string;
  @Prop(String) readonly label!: string;
  @Prop(String) readonly innerLabel!: string;
  @Prop(String) readonly help!: string;
  @Prop(Boolean) readonly returnObject!: boolean;
  @Prop(Boolean) readonly readonly!: boolean;
  @Prop(Boolean) readonly loading!: boolean;
  @Prop(String) readonly errorMessage!: string;
  @Prop(Boolean) readonly error!: boolean;
  @Prop(Boolean) readonly hideSelected!: boolean;
  @Prop(Boolean) readonly isRequired!: boolean;
  @Prop(Boolean) readonly isMultiple!: boolean;
  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly hideMenu!: boolean;
  @Prop(Boolean) readonly hideDetails!: boolean;
  @Prop(Number) readonly itemsLength!: number;

  get innerValue(): Value {
    return this.value;
  }

  set innerValue(value: Value) {
    this.$emit('change', value);
  }

  get isClearable(): boolean {
    if (!this.clearable || !this.value) {
      return false;
    }

    if (Array.isArray(this.value)) {
      return !!this.value.length;
    }

    return !!(this.value as SelectItem).value;
  }

  get isPaginationShown(): boolean {
    return this.itemsLength > this.perPage;
  }

  get contentClass(): string {
    const { variant } = this;

    return `select-menu ${variant}`;
  }

  handleClick(): void {
    this.$emit('onClick');
  }

  handleFocus(value: Value): void {
    this.$emit('onFocus', value);
  }

  handleBlur(value: Value): void {
    this.$emit('onBlur', value);
  }

  handleChange(value: Value): void {
    this.$emit('onChange', value);
  }

  handleClearClick(): void {
    const emptyItem = { text: '', value: '' };

    this.$emit('change', this.isMultiple ? [] : emptyItem);
  }

  handlePageChange(pageChange: PageChange): void {
    const { page, perPage } = pageChange;

    this.$emit('onPageChange', { page, perPage });
  }

  handleSelectAllToggle(items: SelectItem[]): void {
    this.$emit('change', items);
    this.$emit('selectAllLogically', items.length === this.items.length);
  }

  deleteChip(itemNeedToRemove: SelectItem, array: Value): void {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === itemNeedToRemove) {
          array.splice(i, 1);
        }
      }
    }
  }

  parseName(item: string | SelectItem): unknown {
    if (typeof item === 'object' && typeof this.itemText === 'string') {
      return item[this.itemText];
    } else if (typeof this.itemText === 'function') {
      return this.itemText(item);
    }
    return item;
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

  .v-input.v-select::v-deep {
    color: $light;

    &.v-text-field--solo .v-input__control {
      min-height: auto;
    }

    &.v-input--is-focused .v-input__slot {
      border-color: $primary;
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
    }

    &.v-input--is-disabled .v-input__slot .v-input__append-inner {
      display: none;
    }

    &.v-input--is-disabled .v-input__slot span.select-item {
      color: $medium;
    }

    &:hover {
      color: $light !important;
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

    &.micro .v-select__selections {
      min-height: inherit;
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
      background-position: center center;
      content: "";
    }

    .v-select__slot .v-input__append-inner .v-input__icon--clear .v-icon::before {
      background-image: url("data:image/svg+xml,%3Csvg aria-labelledby='box' height='18' width='18' viewBox='0.512700080871582 0 15.999999046325684 16' role='presentation' fill-rule='evenodd' clip-rule='evenodd' xmlns='http://www.w3.org/2000/svg' class='svg'%3E%3Ctitle id='box' lang='en'%3E box icon %3C/title%3E%3Cg fill='%23828286'%3E%3Cg%3E%3Ccircle cx='8.5127' cy='8' r='8'%3E%3C/circle%3E%3Cpath d='M12.0127 5.1125L11.4002 4.5L8.5127 7.3875L5.6252 4.5L5.0127 5.1125L7.9002 8L5.0127 10.8875L5.6252 11.5L8.5127 8.6125L11.4002 11.5L12.0127 10.8875L9.1252 8L12.0127 5.1125Z' fill='white'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      content: "";
    }

    .v-select__slot .v-input__append-inner {
      align-self: center;
    }

    .v-select__slot .v-input__icon--clear .v-icon.primary--text {
      color: $accent !important;
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
    }

    .v-chip .v-chip__content {
      white-space: normal;
    }

    .v-chip .v-icon {
      color: $white;
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

    .v-messages__message {
      justify-content: flex-start !important;
    }
  }

  .v-application--is-ltr::v-deep {

    .v-text-field .v-input__append-inner {
      padding-left: 10px;
    }
  }

  .pagination {
    padding: 8px 16px;
  }
</style>

<style lang="scss">
  @import "@/assets/styles/_variables.scss";

  $accent: map-get($map: $theme-colors, $key: "accent");
  $bright: map-get($map: $theme-colors, $key: "bright");
  $light: map-get($map: $theme-colors, $key: "light");
  $white: map-get($map: $theme-colors, $key: "white");
  $error: map-get($theme-colors, "error");

  .v-input.v-select {

    &.error--text .v-input__control .v-input__slot {
      border: 1px solid $error;
    }
  }

  .select-menu {
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

    &.no-borders {
      border: 0;
    }
  }
</style>
