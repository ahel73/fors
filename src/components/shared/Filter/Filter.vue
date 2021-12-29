<template>
  <div class="wrapper px-0">
    <v-menu
      v-model="isDialogFilterShow"
      :close-on-content-click="false"
      :eager="searchOnMount || eager"
      :nudge-top="-menuTopOffset"
      content-class="dialog"
      bottom
      offset-y
    >
      <template #activator="{ on, attrs }">
        <div
          v-on="on"
          v-bind="attrs"
        >
          <select-component
            v-model="searchLabels"
            :class="['search', { overlay: isDialogFilterShow }]"
            :items="searchLabels"
            :with-all="false"
            color="#d19b3f"
            inner-label="Фильтр + поиск"
            no-data-text=""
            text-after-chip="+ поиск"
            variant="micro no-borders"
            hide-menu
            hide-details
            chips
            is-multiple
            return-object
          >
            <template #appendIcon>
              <icon-component>
                <search-icon />
              </icon-component>
            </template>
          </select-component>
        </div>
      </template>
      <filter-dialog
        @onSearch="handleSearch"
        @onReset="handleReset"
        :filters="processedFilters"
        :initial-items="initialItems"
        :search-error="searchError"
        :search-on-mount="searchOnMount"
      />
    </v-menu>
    <v-overlay
      :value="isDialogFilterShow"
      color="#24242426"
    />
  </div>
</template>

<script lang="ts">
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FilterTypeNames, FilterTypes, FlattenedFilter, SearchInfo } from './types';
import FilterDialog from '@/components/shared/Filter/FilterDialog/FilterDialog.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import SearchIcon from '@/components/shared/IconComponent/icons/SearchIcon.vue';
import SelectComponent, { SelectItem } from '@/components/shared/inputs/SelectComponent.vue';
import { OutputFilters, RangeSearchValue } from '@/components/shared/Filter/FilterTypes/types';

import { getRangeLabels, isRangeFilter } from '@/utils';

/**
 * Entry point of filter
 * @example пример формата передаваемых фильтров
 *  {
 *    multiFilters: [
        {
          name: 'multiSearch', // required for updates by entity name
          label: 'Мультипоиск',
          names: ['searchByName-1', 'searchByName-2'],
          isDefault: true,
          defaultValue: '',
          valueType: ValueTypes.STRING, // type is required to define field type in backend
        },
      ],
      simpleFilters: [
        {
          name: 'search',
          label: 'Поиск',
          isDefault: true,
          defaultValue: '',
          valueType: ValueTypes.STRING,
        },
      ],
      selectFilters: [
        {
          name: 'select field',
          label: 'label',
          items: [
            { text: 'text 1', value: 'value 1' },
            { text: 'text 2', value: 'value 2' },
          ],
          defaultValue: { text: 'text 1', value: 'value 1' },
          isDefault: true,
          valueType: ValueTypes.STRING,
          itemsLength: this.regionsListTotal,
          onPageChange: this.fetchRegionsOktmo, // function
          onEnter: this.searchRegionsOktmo, // function
          multiple: true,
          noFilter: true,
          searchMode: true,
          type: FilterTypeNames.SELECT_FILTER,
          valueType: ValueTypes.STRING,
        },
      ],
      rangeSimpleFilters: [
        {
          to: {
            name: 'horsepowerFrom',
            label: 'Мощность, л.с, C',
            defaultValue: '',
          },
          from: {
            name: 'horsepowerTo',
            label: 'Мощность, л.с, По',
            defaultValue: '',
          },
          isDefault: true,
          label: 'Мощность, л.с',
          name: 'horsepower',
          valueType: ValueTypes.STRING,
        },
      ],
      rangeDateFilters: [
        {
          to: {
            name: 'priceFrom',
            label: 'Стоимость, руб, C',
            defaultValue: '',
          },
          from: {
            name: 'priceTo',
            label: 'Стоимость, руб, По',
            defaultValue: '',
          },
          isDefault: true,
          label: 'Ценовой диапозон',
          name: 'price',
        },
      ],
      checkboxSimpleFilters: [
        {
          name: 'checkbox name',
          label: 'Поиск',
          isDefault: true,
          defaultValue: false,
          valueType: ValueTypes.BOOL,
        },
      ],
    }
  * @example пример формата получаемых данных из фильтра
  * [
      {
        type: SimpleFilterItem,
        negative: false,
        name: field1,
        value: [10],
        valueType: ValueTypes.STRING,
      },
      {
        type: RangeFilterItem,
        negative: false,
        name: field2,
        valueFrom: [20],
        valueTo: [30]
        valueType: ValueTypes.STRING,
      },
      {
        type: MultiFilterItem,
        negative: false,
        names: [
          field1,
          field2,
          field3
        ],
        value: [search string]
        valueType: ValueTypes.STRING,
      }
    ]
 */
@Component({
  name: 'filter-component',
  components: {
    FilterDialog,
    IconComponent,
    SearchIcon,
    SelectComponent,
  },
})
export default class FilterComponent extends Vue {
  @Prop({ type: Boolean, default: false }) closeOnSearch!: FilterTypes;
  @Prop(Object) filters!: FilterTypes;
  @Prop({ type: Array, default: [] }) initialItems!: OutputFilters;
  @Prop(String) searchError!: string;
  @Prop(Boolean) searchOnMount!: boolean;
  @Prop(Boolean) eager!: boolean;
  @Prop({ type: Array, default: [] }) parentSearchLabels!: [];

  searchLabels: (string | undefined)[] = [];
  isDialogFilterShow = false;
  menuTopOffset = 20;

  get processedFilters(): FlattenedFilter[] {
    return this.sortFilters(this.flattenFilters(this.filters));
  }

  flattenFilters(filters: FilterTypes): FlattenedFilter[] {
    return reduce<FilterTypes, FlattenedFilter[]>(filters, (flattenedFilters, filter = []) => ([
      ...flattenedFilters,
      ...filter,
    ]), []);
  }

  sortFilters(filters: FlattenedFilter[]): FlattenedFilter[] {
    return filters.sort((prevFilter: FlattenedFilter, nextFilter: FlattenedFilter) => {
      const { order: prevFilterOrder = Infinity } = prevFilter;
      const { order: nextFilterOrder = Infinity } = nextFilter;

      return prevFilterOrder - nextFilterOrder;
    });
  }

  handleSearch(searchInfo: SearchInfo): void {
    const { outputFilterLabels, outputFilters } = searchInfo;

    this.searchLabels = outputFilterLabels;

    if (this.closeOnSearch) {
      this.isDialogFilterShow = false;
    }

    this.$emit('onSearch', outputFilters);
  }

  handleReset(): void {
    this.$emit('onReset');
  }

  @Watch('isDialogFilterShow')
  onShowChange(isDialogFilterWShow: boolean): void {
    isDialogFilterWShow && this.$emit('onShow');
  }

  @Watch('isDialogFilterShow')
  returnIsDialogFilterShow(newV) {
    !newV && this.$emit('return-search-labels', { searchLabels: this.searchLabels });
  }

  @Watch('initialItems')
  onInitialItemsChange(initialItems: OutputFilters): void {
    console.log(initialItems);
    if (!this.searchLabels.length) {
      this.searchLabels = initialItems.map(item => {
        const currentFilter = this.processedFilters.find(filter => {
          return isEqual(filter.name, item.name) || (filter.name === 'search' && item.names);
        });
        if (currentFilter && currentFilter.type === FilterTypeNames.SELECT_FILTER && isArray(item.value)) {
          const totalValues = item.value.map((i: unknown) => ` ${(i as SelectItem).text}`);
          return currentFilter.label + ': ' + totalValues;
        } else if (currentFilter && currentFilter.type === FilterTypeNames.SIMPLE_FILTER && item.value[0]) {
          return currentFilter.label + ': ' + (item.value[0] as SelectItem).text;
        } else if (currentFilter && isRangeFilter(currentFilter.type)) {
          const { valueFrom, valueTo } = item as RangeSearchValue;
          const { label } = currentFilter;

          return getRangeLabels(label, valueFrom, valueTo);
        } else if (currentFilter && !isArray(item.value)) {
          return currentFilter.label + ': ' + (item.value as SelectItem).text;
        } else if (currentFilter) {
          return currentFilter.label + ': ' + item.value;
        }
      });
    }
  }

  created() {
    this.searchLabels = this.parentSearchLabels;
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $white: map-get($map: $theme-colors, $key: "white");

  .wrapper {
    overflow: initial;
  }

  .wrapper,
  .search {
    position: relative;
    width: 520px;
  }

  .overlay {
    z-index: map-get($zIndexes, "filter") !important;
  }

  .dialog {
    background: $white;
    border: 1px solid map-get($map: $theme-colors, $key: "bright");
    border-radius: 4px;
    box-shadow: 0 16px 32px rgba($color: map-get($map: $theme-colors, $key: "dark"), $alpha: .1);
    box-sizing: border-box;
    width: 520px;
  }
</style>
