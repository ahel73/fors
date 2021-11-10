<template>
  <menu-component
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
    :attach="false"
    :absolute="false"
    confirm-title="Применить"
    max-width="486px"
    padded
  >
    <template #outer_activator>
      <icon-button
        type="text"
        text="Настроить вид"
      >
        <template #prependIcon>
          <icon-component
            :width="18"
            :height="18"
          >
            <gear-icon />
          </icon-component>
        </template>
      </icon-button>
    </template>
    <template #title>
      <h2 class="title">
        Настроить вид
      </h2>
    </template>
    <template #content>
      <v-row>
        <v-col class="pt-0 mt-3">
          <icon-button
            @click="handleChooseAll"
            classnames="icon-button"
            type="text"
            text="Выбрать все"
          />
          <icon-button
            @click="handleCancelAll"
            classnames="icon-button"
            type="text"
            text="Отменить все"
          />
        </v-col>
      </v-row>
      <v-row class="pt-0 mt-4">
        <template v-for="{ isVisible = true, isEditable = true, text, value } in columns">
          <v-col
            v-if="isVisible"
            class="pt-0 mt-2"
            cols="6"
            :key="value"
          >
            <checkbox-component
              v-model="models[value]"
              :disabled="!isEditable"
              :label="text || value"
              hide-details
            />
          </v-col>
        </template>
      </v-row>
    </template>
  </menu-component>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Columns, ColumnModel } from '@/components/shared/table/ColumnsView/ColumnsView';
import { TableHeaders } from '@/components/shared/table/DataTable.types';
import { PropType } from 'vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import DefaultButton from '@/components/shared/buttons/DefaultButton.vue';
import MenuComponent from '@/components/shared/Menu/Menu.vue';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import GearIcon from '@/components/shared/IconComponent/icons/GearIcon.vue';

@Component({
  name: 'columns-view',
  components: {
    'button-component': DefaultButton,
    CheckboxComponent,
    GearIcon,
    IconButton,
    IconComponent,
    MenuComponent,
  },
})
export default class ColumnsView extends Vue {
  @Prop({ type: Array as PropType<Columns[]>, default: () => [] }) readonly columns!: Columns[];
  @Prop(String) readonly id!: string;

  models: ColumnModel = {};

  get visibleColumns(): Columns[] {
    return this.columns.filter(({ value }) => this.models[value]);
  }

  get additionalHeaders(): TableHeaders[] {
    return this.visibleColumns.reduce<TableHeaders[]>((headers, header) => {
      const { children, colSpan = 0, row } = header;

      const offsetRows = new Array(colSpan).fill({ text: '' });

      if (row && children) {
        return [...headers, ...offsetRows, { ...header, colSpan: children.length }];
      }
      return [...headers];
    }, []);
  }

  get headers(): TableHeaders[] {
    return this.visibleColumns.reduce<TableHeaders[]>((headers, header) => {
      const { children } = header;

      if (children) {
        return [...headers, ...children];
      }
      return [...headers, header];
    }, []);
  }

  handleChooseAll(): void {
    for (const column of this.columns) {
      const { value, isEditable = true } = column;

      if (isEditable) {
        this.models[value] = true;
      }
    }
  }

  handleCancelAll(): void {
    for (const column of this.columns) {
      const { value, isEditable = true } = column;

      if (isEditable) {
        this.models[value] = false;
      }
    }
  }

  handleConfirm(): void {
    for (const column of this.columns) {
      column.isDefault = this.models[column.value] as boolean;
    }
    this.$emit('saveColumns');
    this.$emit('update:headers', this.headers);
    this.$emit('update:additionalHeaders', [this.additionalHeaders]);
  }

  handleCancel(): void {
    for (const column of this.columns) {
      const { value, isDefault = false } = column;

      this.models[value] = isDefault;
    }
  }

  @Watch('columns', { deep: true, immediate: true })
  onColumnschange(columns: Columns[]): void {
    for (const column of columns) {
      const { value, isDefault = false } = column;

      Vue.set(this.models, value, isDefault);
    }
    this.$emit('update:headers', this.headers);
    this.$emit('update:additionalHeaders', [this.additionalHeaders]);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  .title {
    font-size: 13px;
    font-style: normal;
    font-weight: bold;
    line-height: 16px;
  }

  .icon-button {

    &:first-child {
      padding-left: 0 !important;
    }
  }
</style>
