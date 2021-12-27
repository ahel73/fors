<template>
  <div class="wrapper">
    <div
      v-if="hasOuterActivatorSlot"
      @click="isMenuShow = true"
    >
      <slot name="outer_activator" />
    </div>
    <v-menu
      v-model="isMenuShow"
      :absolute="absolute"
      :attach="attach"
      :bottom="bottom"
      :close-on-content-click="closeOnContentClick"
      :content-class="`dialog ${padded && 'padded'}`"
      :max-width="maxWidth"
      :min-width="minWidth"
      :nudge-top="menuTopOffset"
      :offset-y="offsetY"
    >
      <template #activator="{ on, attrs }">
        <div
          v-on="on"
          v-bind="attrs"
        >
          <slot name="activator" />
        </div>
      </template>
      <v-row v-if="hasTitleSlot">
        <v-col>
          <slot name="title" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <slot name="content" />
        </v-col>
      </v-row>
      <v-row v-if="showControls">
        <v-col class="d-flex justify-end pt-8">
          <button-component
            @click="handleCancel"
            :title="cancelTitle"
            class="button"
            size="micro"
          />
          <button-component
            @click="handleConfirm"
            :title="confirmTitle"
            class="button"
            size="micro"
            variant="primary"
          />
        </v-col>
      </v-row>
    </v-menu>
    <v-overlay
      v-if="showOverlay"
      :value="isMenuShow"
      color="#24242426"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import DefaultButton from '@/components/shared/buttons/DefaultButton.vue';

@Component({
  name: 'menu-component',
  components: {
    'button-component': DefaultButton,
    IconButton,
  },
})
export default class MenuComponent extends Vue {
  @Prop({ type: String, default: 'Принять' }) readonly confirmTitle!: string;
  @Prop({ type: String, default: 'Отменить' }) readonly cancelTitle!: string;
  @Prop({ type: Number, default: -20 }) readonly menuTopOffset!: number;
  @Prop({ type: Boolean, default: true }) readonly showOverlay!: boolean;
  @Prop({ type: Boolean, default: true }) readonly showControls!: boolean;
  @Prop({ type: Boolean, default: true }) readonly closeOnConfirm!: boolean;
  @Prop({ type: Boolean, default: true }) readonly closeOnCancel!: boolean;
  @Prop({ type: Boolean, default: true }) readonly attach!: boolean;
  @Prop({ type: Boolean, default: true }) readonly absolute!: boolean;
  @Prop({ type: Boolean, default: false }) readonly closeOnContentClick!: boolean;
  @Prop(Boolean) readonly bottom!: boolean;
  @Prop(Boolean) readonly offsetY!: boolean;
  @Prop(String) readonly contentClass!: string;
  @Prop(String) readonly minWidth!: string;
  @Prop(String) readonly maxWidth!: string;
  @Prop(String) readonly title!: string;
  @Prop(Boolean) readonly padded!: boolean;

  isMenuShow = false;

  closeMenu(): void {
    this.isMenuShow = false;
  }

  get hasOuterActivatorSlot(): boolean {
    return !!this.$slots.outer_activator;
  }

  get hasTitleSlot(): boolean {
    return !!this.$slots.title;
  }

  handleConfirm(): void {
    this.$emit('onConfirm');
    this.closeOnConfirm && this.closeMenu();
  }

  handleCancel(): void {
    this.$emit('onCancel');
    this.closeOnCancel && this.closeMenu();
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $bright: map-get($map: $theme-colors, $key: "bright");
  $white: map-get($map: $theme-colors, $key: "white");
  $drop_dark: map-get($map: $shadows, $key: "dark-1");

  .wrapper {
    display: inline-block;
    position: relative;
  }

  .dialog {
    background-color: $white;
    border: 1px solid $bright;
    border-radius: 4px;
    box-shadow: 0 16px 32px $drop_dark;
    box-sizing: border-box;
  }

  .padded {
    padding: 20px;
  }

  .button {

    &:first-child {
      margin-right: 20px;
    }
  }
</style>
