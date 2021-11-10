<template>
  <div class="mb-2">
    <text-component :class="['label', error && 'error', classnames]">
      {{ label }}
    </text-component>
    <v-icon
      v-if="showIcon"
      class="ml-2 icon"
      color="#EE3D3D"
      size="10"
    >
      {{ icon }}
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TextComponent from '@/components/shared/TextComponent.vue';

@Component({
  name: 'label-component',
  components: {
    TextComponent,
  },
})
export default class Label extends Vue {
  @Prop(Boolean) showIcon!: boolean;
  @Prop(String) label!: string;
  @Prop(Boolean) error!: boolean;
  @Prop({ type: String, default: '' }) classnames!: string;
  @Prop({ type: String, default: 'mdi-asterisk' }) icon!: string;
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $black: map-get($theme-colors, "black");
  $light: map-get($map: $theme-colors, $key: "light");
  $error: map-get($theme-colors, "error");

  .label {
    color: $light;
    font-size: 13px;
    font-weight: normal;
    line-height: 16px;
    margin-bottom: 8px;

    &.error {
      background-color: transparent !important;
      border-color: transparent !important;
      color: $error;
    }

    &.label-as-h5 {
      color: $black;
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
    }
  }

  .mb-2 {
    position: relative;
  }

  .justify-start .mb-2 {
    margin-right: 15px;
  }

  .icon {
    position: absolute;
    vertical-align: super;
  }
</style>
