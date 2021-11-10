<template>
  <button
    @click="handleClick"
    v-on="on"
    v-bind="attrs"
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    :disabled="disabled"
    :style="{width: width}"
    :type="type"
  >
    <v-progress-circular
      v-if="loading"
      :class="['loader', `loader--${variant}`, `loader--${size}`]"
      indeterminate
    />
    <span
      v-else
      class="btn-container"
    >
      <span
        v-if="prependIcon"
        :style="`padding-right: ${calculatedPadding}`"
      >
        <v-icon class="icon">{{ prependIcon }}</v-icon>
      </span>
      <span>
        {{ size === 'large' ? uppercase : title }}
      </span>
      <span
        v-if="appendIcon"
        :style="`padding-left: ${calculatedPadding}`"
      >
        <v-icon class="icon">{{ appendIcon }}</v-icon>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

type Variants = 'default' | 'primary' | 'success' | 'error';

type Sizes = 'large' | 'medium' | 'small' | 'micro' | 'pico' ;

type Types = 'submit' | 'rest' | 'button';

@Component({
  name: 'button-component',
})
export default class DefaultButton extends Vue {
  @Prop({ type: String, default: 'medium' }) size!: Sizes;
  @Prop({ type: String, default: 'default' }) variant!: Variants;
  @Prop({ type: String, default: 'button' }) type!: Types;
  @Prop({ type: String, default: 'Button' }) title!: string;
  @Prop({}) attrs!: string;
  @Prop({}) on!: string;
  @Prop(String) width!: string;
  @Prop(String) prependIcon!: string;
  @Prop(String) appendIcon!: string;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) depressed!: boolean;
  @Prop(Boolean) loading!: boolean;

  get uppercase(): string {
    return this.title.toUpperCase();
  }

  get calculatedPadding(): string {
    switch (this.size) {
      case 'large':
        return '24px';
      case 'small':
        return '22px';
      case 'micro':
        return '16px';
      default:
        return '14px';
    }
  }

  handleClick(event: MouseEvent): void {
    this.$emit('click', event);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  @import "./_buttons.scss";

  @include default-style;

  @include button-size;

  $primary: map-get($map: $theme-colors, $key: "primary");
  $white: map-get($map: $theme-colors, $key: "white");

  .btn {
    color: $white;
    font-style: normal;
    font-weight: 600;

    @include btn-border-radius(4px);

    &:disabled {
      background-color: $btn-background-disabled;
      border-color: $btn-border-color-disabled;
      color: $btn-color-disabled;
      pointer-events: none;
    }
  }

  /*.btn-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }*/

  .icon {
    color: inherit;
    font-size: inherit;
    font-style: inherit;
  }
</style>
