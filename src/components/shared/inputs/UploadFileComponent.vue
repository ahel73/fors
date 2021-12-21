<template>
  <div
    :style="{ width }"
  >
    <label-component
      v-if="label"
      :label="label"
      :show-icon="required"
    />
    <v-file-input
      v-model="innerValue"
      @click:clear="handleClear"
      @change="handleChange"
      :clearable="clearable"
      :disabled="disabled"
      :error-messages="errorMessage"
      :error="error"
      :hide-details="hideDetails"
      :multiple="multiple"
      :chips="chips"
      :placeholder="placeholder"
      :prepend-icon="prependIcon"
      :accept="acept"
      :class="variant"
      class="pt-0"
    />
    <v-list>
      <v-list-item
        v-for="file in filesList"
        class="d-flex justify-start"
        :key="file.originalId"
      >
        <v-row
          align="center"
          justify="space-between"
          no-gutters
        >
          <v-col
            cols="1"
          >
            <base-action
              @click="handleDownloadFile(file.originalId)"
              hint="Скачать файл"
              :disabled="disabled"
            >
              <template #customIcon>
                <v-icon>{{ downloadIcon }}</v-icon>
              </template>
            </base-action>
          </v-col>
          <v-col
            cols="8"
            class="ml-2 truncate"
          >
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <span
                  v-on="on"
                  v-bind="attrs"
                >
                  {{ file.name }}
                </span>
              </template>
              {{ file.name }}
            </v-tooltip>
          </v-col>
          <v-col
            cols="1"
          >
            <base-action
              v-if="deletable"
              @click="handleDeletedFile(file.originalId)"
              hint="Удалить файл"
              :disabled="disabled"
            >
              <template #customIcon>
                <v-icon>{{ deleteIcon }}</v-icon>
              </template>
            </base-action>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/shared/Label/Label.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';

type Variants = 'micro' | 'small';

@Component({
  name: 'upload-file-component',
  components: {
    LabelComponent,
    BaseAction,
  },
})

export default class UploadFileComponent extends Vue {
  @Model('change', { type: Array }) readonly value!: FileList;
  @Prop({ type: String, default: 'Данные отсутствуют' }) readonly noDataText!: string;
  @Prop({ type: String, default: 'auto' }) readonly width!: string;
  @Prop({ type: String, default: 'small' }) readonly variant!: Variants;
  @Prop({ type: String, default: 'Добавить файл' }) readonly placeholder!: string;
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean;
  @Prop({ type: Boolean, default: false }) readonly chips!: boolean;
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean;
  @Prop({ type: Boolean, default: true }) readonly deletable!: boolean;
  @Prop({ type: Array, default: () => [] }) readonly filesList!: string[];
  @Prop({ type: String, default: 'mdi-paperclip' }) readonly prependIcon!: string;
  @Prop({ type: String, default: 'mdi-file-download-outline' }) readonly downloadIcon!: string;
  @Prop({ type: String, default: 'mdi-trash-can-outline' }) readonly deleteIcon!: string;
  @Prop({ type: [String, Array], default: '' }) errorMessage!: string | string[];
  @Prop({ type: [String, Array], default: '' }) readonly label!: string;
  @Prop({ type: [String, Array], default: '.pdf,.doc,.docx,.xls,.xlsx,.jpg' }) readonly acept!: string;
  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly required!: boolean;
  @Prop(Boolean) readonly error!: boolean;
  @Prop(Boolean) readonly hideDetails!: boolean;

  get innerValue(): FileList {
    return this.value;
  }

  set innerValue(files: FileList) {
    this.$emit('change', files);
  }

  handleClear(event: Event): void {
    this.$emit('onClear', event);
  }

  handleChange(files: FileList): void {
    this.$emit('onChange', files);
  }

  handleDownloadFile(id: string): void {
    this.$emit('downloadFile', id);
  }

  handleDeletedFile(id: string): void {
    this.$emit('deleteFile', id);
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

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
