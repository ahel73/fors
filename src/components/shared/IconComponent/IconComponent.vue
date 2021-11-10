<template>
  <svg
    v-on="$listeners"
    v-bind="$attrs"
    :aria-labelledby="iconName"
    :height="height"
    :width="width"
    :viewBox="viewbox"
    role="presentation"
    fill-rule="evenodd"
    clip-rule="evenodd"
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    ref="svg"
  >
    <title
      :id="iconName"
      lang="en"
    >
      {{ iconName }} icon
    </title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'icon-component',
})
export default class IconComponent extends Vue {
  @Prop({ default: 18, type: [Number, String] }) readonly width!: number | string;
  @Prop({ default: 18, type: [Number, String] }) readonly height!: number | string;
  @Prop({ default: 'box', type: String }) readonly iconName!: string;
  @Prop({ default: '#d19b3f', type: String }) readonly iconColor!: string;

  viewbox = '0 0 15 15';

  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    let timeoutId = setTimeout(function getViewbox() {
      const { x, y, width, height } = (_this.$refs.svg as SVGGraphicsElement).getBBox();

      if (width || height) {
        _this.viewbox = `${x} ${y} ${width} ${height}`;

        clearTimeout(timeoutId);
      } else {
        timeoutId = setTimeout(getViewbox, 500);
      }
    });
  }
}
</script>

<style lang="scss">
  .svg {
    cursor: pointer;
    display: inline-block;
    vertical-align: baseline;
  }
</style>
