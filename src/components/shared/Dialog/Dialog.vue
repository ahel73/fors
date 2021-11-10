<template>
  <v-dialog
    v-model="show"
    @click:outside="handleOutsideClick"
    @keydown="handleKeydown"
    :fullscreen="fullscreen"
    content-class="dialog"
    :width="width"
  >
    <div :class="['content', { inline }]">
      <v-progress-linear
        v-if="loading"
        class="progressbar"
        color="#d19b3f"
        indeterminate
      />
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <slot name="title" />
          <div>
            <icon-component
              v-if="withFullscreen"
              @click="toggleFullscreen"
              :width="16"
              class="mr-2"
              icon-color="#828286"
            >
              <fullscreen-icon />
            </icon-component>
            <icon-component
              v-if="withCloseIcon"
              @click="handleCancel"
              :width="16"
              icon-color="#828286"
            >
              <close-icon />
            </icon-component>
          </div>
        </v-card-title>
        <v-card-text>
          <slot
            v-if="hasContent"
            name="content"
          />
          <text-component
            v-else-if="noDataShow"
            variant="p"
            class="no-data-text"
          >
            Данные отсутствуют
          </text-component>
        </v-card-text>
        <v-card-actions
          v-if="prompt"
          :class="['d-flex', controlsJustify]"
        >
          <default-button
            v-if="confirmTitle"
            @click="handleConfirm"
            :disabled="confirmDisabled"
            :title="confirmTitle"
            class="mr-2"
            size="micro"
            variant="primary"
          />
          <default-button
            v-if="cancelTitle"
            @click="handleCancel"
            :title="cancelTitle"
            size="micro"
            variant="primary"
          />
        </v-card-actions>
        <v-card-actions
          v-else
          :class="['d-flex', controlsJustify]"
        >
          <default-button
            v-if="cancelTitle"
            @click="handleCancel"
            :title="cancelTitle"
            class="mr-2"
            size="micro"
            variant="default"
          />
          <default-button
            v-if="confirmTitle"
            @click="handleConfirm"
            :disabled="confirmDisabled"
            :title="confirmTitle"
            size="micro"
            variant="primary"
          />
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import DefaultButton from '@/components/shared/buttons/DefaultButton.vue';
import FullscreenIcon from '@/components/shared/IconComponent/icons/FullscreenIcon.vue';
import CloseIcon from '@/components/shared/IconComponent/icons/CloseIcon.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

@Component({
  name: 'dialog-component',
  components: {
    CloseIcon,
    DefaultButton,
    FullscreenIcon,
    IconComponent,
    TextComponent,
  },
})
export default class Dialog extends Vue {
  @Model('change', { type: Boolean, default: false }) value!: boolean;

  @Prop({ type: String, default: '' }) readonly id!: string;
  @Prop({ type: String, default: 'Да' }) readonly confirmTitle!: string;
  @Prop({ type: String, default: 'Нет' }) readonly cancelTitle!: string;
  @Prop({ type: String, default: 'auto' }) readonly width!: string;
  @Prop({ type: String, default: 'justify-center' }) readonly controlsJustify!: string;
  @Prop({ type: Boolean, default: true }) readonly closeOnOutsideClick!: boolean;
  @Prop({ type: Boolean, default: true }) readonly closeOnSuccess!: boolean;
  @Prop({ type: Boolean, default: true }) readonly closeOnCancel!: boolean;
  @Prop({ type: Boolean, default: false }) readonly noDataShow!: boolean;
  @Prop({ type: Boolean, default: true }) readonly prompt!: boolean;
  @Prop(String) readonly title!: string;
  @Prop(Boolean) readonly withFullscreen!: boolean;
  @Prop(Boolean) readonly withCloseIcon!: boolean;
  @Prop(Boolean) readonly confirmDisabled!: boolean;
  @Prop(Boolean) readonly loading!: boolean;
  @Prop(Boolean) readonly inline!: boolean;

  fullscreen = false;

  get show(): boolean {
    return this.value;
  }

  set show(value: boolean) {
    this.$emit('change', !value);
  }

  get hasContent(): boolean {
    return !!this.$slots.content;
  }

  handleConfirm(): void {
    this.closeOnSuccess && this.closeDialog();
    this.$emit('onSuccess');
  }

  handleCancel(): void {
    this.closeOnCancel && this.closeDialog();
    this.$emit('onCancel');
  }

  handleOutsideClick(): void {
    this.closeOnOutsideClick && this.closeDialog();
    this.$emit('onCancel');
  }

  handleKeydown(key: KeyboardEvent): void {
    if (key.code === 'Escape') {
      this.closeDialog();
      this.$emit('onCancel');
    }
  }

  closeDialog(): void {
    this.$emit('change', false);
  }

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  @Watch('show', { immediate: true })
  onInnerShowChange(show: boolean): void {
    if (show) {
      this.$emit('onOpen');
    }
  }
}
</script>

<style scoped lang="scss">
  .no-data-text {
    font-size: 18px;
    text-align: center;
  }

  .progressbar {
    left: 0;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .content::v-deep {
    position: relative;

    &.inline .v-card {
      display: flex;
      flex-wrap: wrap;
    }

    &.inline .v-card__title {
      flex: 0 1 100%;
    }

    &.inline .v-card__text {
      flex: 0 1 70%;
    }
  }

  .dialog > .v-card > .v-card__title,
  .dialog > .v-card > .v-card__text,
  .dialog .v-card__actions {
    padding: 10px 20px;
  }
</style>
