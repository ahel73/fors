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
    <v-file-input
      v-model="innerValue"
      @click:clear="handleClear"
      @change="handleChange"
      :class="variant"
      :clearable="clearable"
      :disabled="disabled"
      :error-messages="errorMessage"
      :error="isError"
      :hide-details="hideDetails"
      :multiple="isMultiple"
      :placeholder="placeholder"
      :prepend-icon="prependIcon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/shared/Label/Label.vue';
import { getFileExtension } from '@/utils/file';

type Variants = 'micro' | 'small';

@Component({
  name: 'upload-file-component',
  components: {
    LabelComponent,
  },
})

export default class UploadFileComponent extends Vue {
  @Model('change', { type: Array }) readonly value!: FileList;

  @Prop({ type: String, default: 'Данные отсутствуют' }) readonly noDataText!: string;
  @Prop({ type: String, default: 'auto' }) readonly width!: string;
  @Prop({ type: Boolean, default: false }) readonly isMultiple!: boolean;
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean;
  @Prop({ type: String, default: 'small' }) readonly variant!: Variants;
  @Prop({ type: String, default: 'mdi-arrow-collapse-up' }) readonly prependIcon!: string;
  @Prop({ type: [String, Array], default: '' }) errorMessage!: string | string[];
  @Prop({ type: [String, Array], default: '' }) readonly label!: string;
  @Prop({ type: Array, default: () => [] }) readonly allowedTypes!: string[];
  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly isRequired!: boolean;
  @Prop(Boolean) readonly isError!: boolean;
  @Prop(Boolean) readonly hideDetails!: boolean;
  @Prop(String) readonly placeholder!: string;

  get innerValue(): FileList {
    return this.value;
  }

  set innerValue(files: FileList) {
    this.$emit('change', files);
  }

  handleClear(): void {
    this.$emit('change', []);
  }

  handleChange(files: FileList): void {
    const [file] = files;

    this.$emit('onChange', {
      files,
      isWrongFileExtension: this.isWrongFileExtension(getFileExtension(file)),
    });
  }

  isWrongFileExtension(fileExtension: string): boolean {
    return this.allowedTypes.includes(fileExtension);
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/_variables.scss";

  .v-file-input {
    margin: 0;
    padding: 0;

    &.small {
      font-size: 22px;
    }

    &.micro {
      font-size: 14px;
    }

    .v-input__slot {
      border: 0;

      &:before,
      &:after {
        display: none;
      }

      .v-input__prepend-outer {
        align-self: center;
        display: flex;
        flex-direction: column;
      }

      .v-file-input__text {
        color: map-get($theme-colors, "medium");
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>
