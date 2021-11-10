<template>
  <v-checkbox
    v-model="innerValue"
    :append-icon="appendIcon"
    :disabled="disabled"
    :hide-details="hideDetails"
    :input-value="value"
    :error="isError"
    :label="label"
    :multiple="multiple"
    :prepend-icon="prependIcon"
    :value="initialValue"
    :class="['checkbox', { 'highlight-on-hover': highlightOnHover }]"
    color="#d19b3f"
  >
    <template #append>
      <slot name="append" />
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
  </v-checkbox>
</template>

<script lang="ts">
/* eslint-disable max-len */
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/shared/Label/Label.vue';

@Component({
  name: 'checkbox-component',
  components: {
    LabelComponent,
  },
})
export default class CheckboxComponent extends Vue {
  @Model('change') readonly value!: unknown;

  @Prop({ type: [Object, Array] }) readonly initialValue!: unknown;
  @Prop({ type: Boolean, default: false }) readonly highlightOnHover!: boolean;
  @Prop({ type: Boolean, default: false }) isError!: boolean;
  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly hideDetails!: boolean;
  @Prop(Boolean) readonly multiple!: boolean;
  @Prop(String) readonly appendIcon!: string;
  @Prop(String) readonly label!: string;
  @Prop(String) readonly prependIcon!: string;
  @Prop(String) readonly width!: string;

  get innerValue(): unknown {
    return this.value;
  }

  set innerValue(value: unknown) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $medium: map-get($map: $theme-colors, $key: "medium");
  $checked: map-get($map: $theme-colors, $key: "disabled");

  .checkbox::v-deep {

    &.highlight-on-hover:hover {
      background-color: $checked;
    }

    &.v-input--selection-controls {
      padding: 4px 20px;
    }

    &.v-input--is-disabled .v-icon::before {
      filter: saturate(0);
    }

    &:first-child {
      margin-top: 0 !important;
    }

    %check-icon {
      content: "";
      height: 17px;
      position: absolute;
      width: 17px;
    }

    &.v-input {
      align-items: center;
      display: flex;
    }

    .v-input__slot .v-icon::before {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='1' width='15' height='15' rx='3.5' fill='white' stroke='%23C1C1C1'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;

      @extend %check-icon;
    }

    &.v-input--is-label-active .v-input__slot .v-icon::before {
      background-image: url("data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.249512' y='0.25' width='16' height='16' rx='4' fill='%23D19B3F'/%3E%3Cpath d='M4.74951 8.39L6.98951 10.63L11.7495 5.87' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;

      @extend %check-icon;
    }

    .v-label {
      color: $medium;
      font-size: 14px;
      font-weight: normal;
      line-height: 16px;
    }
  }
</style>
