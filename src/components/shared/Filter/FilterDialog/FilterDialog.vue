<template>
  <div
    @keydown="handleDialogKeydown"
    tabindex="0"
    class="focusable"
  >
    <v-container class="wrapper px-5 py-2">
      <template v-if="filtersCopy.length">
        <v-row v-if="searchError">
          <v-col>
            Ошибка фильтрации.
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- Это надо удалить!-->
            <h6>Компонент фильтр диалог</h6>
            <div
              v-for="(p, i) in defaultFilters"
              :key="i"
            >
              {{ p }}
            </div>
            <!-- До этого!-->
            <filters
              @onRemove="handleFilterRemove"
              :initial-items="initialItems"
              :filters="defaultFilters"
              ref="filters"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <filter-customizer
              :filters="customFilters"
              :on-choose="handleFilterChoose"
              :on-restore-default="handleRestoreDefaultFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <button-component
              @click="handleResetFields"
              class="mr-6"
              size="micro"
              title="Сбросить"
            />
            <button-component
              @click="emitSearchWithFilters"
              variant="primary"
              size="micro"
              title="Найти"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col class="text-center">
            Фильтры не найдены
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FlattenedFilter } from '@/components/shared/Filter/types';
import { Models } from '@/components/shared/Filter/FilterCustomizer/FilterCustomizer.types';
import { Refs } from './FilterDialog.types';
import Input from '@/components/shared/inputs/InputComponent.vue';
import Filters from '@/components/shared/Filter/Filters/Filters.vue';
import FilterCustomizer from '@/components/shared/Filter/FilterCustomizer/FilterCustomizer.vue';
import Button from '@/components/shared/buttons/DefaultButton.vue';
import eventBus from '@/utils/bus/event-bus';
import { OutputFilters, RangeSearchValue } from '@/components/shared/Filter/FilterTypes/types';
import isEqual from 'lodash/isEqual';

@Component({
  name: 'filter-dialog',
  components: {
    'input-component': Input,
    'button-component': Button,
    FilterCustomizer,
    Filters,
  },
})
export default class FilterDialog extends Vue {
  @Prop(Array) readonly filters!: FlattenedFilter[];
  @Prop(Array) initialItems!: OutputFilters;
  @Prop(String) searchError!: string;
  @Prop(Boolean) searchOnMount!: boolean;

  filtersCopy: FlattenedFilter[] = [];

  get defaultFilters(): FlattenedFilter[] {
    return this.filtersCopy.filter(({ isDefault = false }: FlattenedFilter) => isDefault);
  }

  get customFilters(): FlattenedFilter[] {
    return this.filtersCopy.filter(({ isDefault, isCustom }: FlattenedFilter) => isCustom || !isDefault);
  }

  handleFilterChoose(models: Models): void {
    this.filtersCopy = this.filtersCopy.map((filter: FlattenedFilter) => {
      const { name } = filter;

      return has(models, name as string) ? { ...filter, isDefault: models[name as string] } : filter;
    });
  }

  handleFilterRemove(name: string): void {
    this.filtersCopy = this.filtersCopy.map((filter: FlattenedFilter) => {
      if (filter.name === name) {
        return { ...filter, isDefault: false };
      }

      return filter;
    });
  }

  handleRestoreDefaultFields(): void {
    this.filtersCopy = cloneDeep(this.filters);
  }

  handleResetFields(): void {
    this.$emit('onReset');
    (this.$refs as Refs).filters.resetModels();
    this.$nextTick(() => {
      this.emitSearchWithFilters();
    });
  }

  handleDialogKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.emitSearchWithFilters();
    }
  }

  emitSearchWithFilters(): void {
    if ((this.$refs as Refs).filters) {
      const outputFilterLabels = (this.$refs as Refs).filters.getLabels();
      const outputFilters = (this.$refs as Refs).filters.getValues();
      const outputFiltersWithValue = outputFilters.filter((item) => {
        if (item.type === 'RangeFilterItem') {
          const { valueFrom, valueTo } = item as RangeSearchValue;
          return valueFrom?.length || valueTo?.length;
        } else {
          return item.value.length;
        }
      });
      this.$emit('onSearch', { outputFilterLabels, outputFilters: outputFiltersWithValue });
    }
  }

  @Watch('filters', { immediate: true, deep: true })
  onFiltersChange(filters: FlattenedFilter[]): void {
    this.filtersCopy = cloneDeep(filters).map((filter: FlattenedFilter) => {
      const { name } = filter;
      const prevFilter = this.filtersCopy.find(item => item.name === name);

      return prevFilter ? { ...filter, isDefault: prevFilter.isDefault } : filter;
    });
  }

  mounted(): void {
    this.$nextTick(() => {
      if (this.searchOnMount) {
        this.emitSearchWithFilters();
      }
      if (this.initialItems.length) {
        const initialNames: string[] = [];

        this.initialItems.forEach(item => {
          initialNames.push(item.name as string);
          const currentFilter = this.filters.find(filter => {
            return isEqual(filter.name, item.name) || (filter.name === 'search' && item.names);
          });
          if (currentFilter) {
            (this.$refs as Refs).filters.setValue(item.value, item.names ? 'search' : item.name as string, currentFilter.type);
          }
        });
        this.customFilters.forEach(item => {
          if (initialNames.includes(item.name)) {
            item.isDefault = true;
          }
        });
      }
    });
  }

  created(): void {
    eventBus.$on('filter:search', () => {
      this.emitSearchWithFilters();
    });
  }
}
</script>

<style scoped lang="scss">
  .focusable {

    &:focus {
      outline: none;
    }
  }
</style>
