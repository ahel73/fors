<template>
  <div
    :style="{ width : widthWrap }"
    :class="isLabelAfter ? 'd-flex justify-start align-center' : ''"
  >
    <div
      v-if="label"
      :class="isLabelAfter ? 'pr-2' : ''"
    >
      <label-component
        :label="label"
        :show-icon="required"
        :error="isError"
      />
    </div>
    <v-text-field
      v-model="innerValue"
      @input="onInput"
      @blur="handleBlur"
      v-on="$listeners"
      v-bind="$attrs"
      :class="['input', { variant }]"
      :color="color"
      :disabled="disabled"
      :error-count="errorCount"
      :error-messages="errorMessages"
      :error="isError"
      :height="sizeVariants[variant]"
      :hide-details="hideDetails"
      :loading="loading"
      :maxlength="maxlength"
      :min="min"
      :placeholder="placeholder"
      :readonly="readonly"
      :rules="rules"
      :style="{ width }"
      :type="type"
      solo
    >
      <template #append>
        <slot name="append" />
        <icon-component
          v-if="isEditable && clearable && value"
          @click="handleClearClick"
          icon-color="#828286"
        >
          <clear-icon />
        </icon-component>
      </template>
      <template #message="{ message }">
        <text-component class="base-micro text-error">
          {{ message }}
        </text-component>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import ClearIcon from '@/components/shared/IconComponent/icons/ClearIcon.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import LabelComponent from '@/components/shared/Label/Label.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

type Sizes = {
  [key in 'small' | 'micro']: number;
};

type Variants = keyof Sizes;

type Value = string | number | unknown[];

@Component({
  name: 'InputComponent',
  components: {
    ClearIcon,
    IconComponent,
    LabelComponent,
    TextComponent,
  },
})
export default class InputComponent extends Vue {
  @Model('input', { type: [String, Number, Array] }) value!: Value;

  @Prop({ type: String, default: '' }) appendIcon!: string;
  @Prop({ type: String, default: '' }) placeholder!: string;
  @Prop({ type: String, default: '' }) label!: string;
  @Prop({ type: Boolean, default: false }) isLabelAfter!: boolean;
  @Prop({ type: String, default: '#828286' }) color!: string;
  @Prop({ type: String, default: 'text' }) type!: string;
  @Prop({ type: String, default: '100%' }) width!: string;
  @Prop({ type: String, default: 'micro' }) variant!: Variants;
  @Prop({ type: Number, default: 0 }) min!: number;
  @Prop({ type: Array, default: () => [] }) rules!: string;
  @Prop({ type: Boolean, default: false }) isError!: boolean;
  @Prop({ type: Number, default: null }) maxlength!: number;
  @Prop({ type: Number, default: 1 }) errorCount!: number;
  @Prop({ type: [String, Array], default: '' }) errorMessages!: string | string[];
  @Prop(Boolean) clearable!: boolean;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) hideDetails!: boolean;
  @Prop(Boolean) required!: boolean;
  @Prop(Boolean) readonly!: boolean;
  @Prop(Boolean) loading!: boolean;
  @Prop(String) defaultValue!: string;

  sizeVariants: Sizes = {
    small: 56,
    micro: 40,
  }

  get innerValue(): Value {
    return this.value ?? this.defaultValue;
  }

  set innerValue(value: Value) {
    this.$emit('input', value);
  }

  get widthWrap(): string {
    return this.isLabelAfter ? 'auto' : this.width;
  }

  get isEditable(): boolean {
    return !this.disabled && !this.readonly;
  }

  onInput(value: Value): void {
    this.$emit('input', value);
  }

  handleBlur(value: Value): void {
    this.$emit('onBlur', value);
  }

  handleClearClick(): void {
    this.$emit('input', '');
  }

  @Watch('defaultValue')
  onValueChange(defaultValue: Value): void {
    if (!this.value) {
      this.$emit('input', defaultValue);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $secondary: map-get($theme-colors, "secondary");
  $error: map-get($theme-colors, "error");
  $light: map-get($theme-colors, "light");
  $medium: map-get($theme-colors, "medium");
  $primary: map-get($theme-colors, "primary");

  .input::v-deep {

    .v-input__slot {
      border: 1px solid $light;
      border-radius: 4px;
      box-shadow: none !important;
      min-height: 0;
    }

    .v-text-field__details {
      padding: 0 !important;
    }

    .v-input__append-inner svg:not(:first-child) {
      margin-left: 6px;
    }

    &.v-input--is-disabled .v-input__slot {
      background-color: $secondary;
      //border: 1px solid $secondary;
    }

    &.v-input--is-focused .v-input__slot {
      border-color: $primary;
    }

    &.v-input--is-disabled input {
      color: $medium;
    }

    &.validation_error .v-input__slot {
      border: 1px solid $primary;
    }

    &.small {
      font-size: 22px;
    }

    &.micro {
      font-size: 14px;
    }

    &.error--text .v-input__control .v-input__slot {
      border: 1px solid $error;
    }

    &.v-text-field .v-text-field__details {
      padding: 0;
    }

    &.v-text-field.v-text-field--solo .v-input__control {
      min-height: auto;
    }
  }
</style>
