<template>
  <horizontal-scroll
    :loading="loading"
    scroll-target=".v-data-table__wrapper"
  >
    <text-component
      v-if="title"
      variant="h4"
    >
      {{ title }}
    </text-component>
    <tabs
      v-if="tabs && tabs.length"
      :current-tab-index="currentTabIndex"
      :loading="isTabsLoading"
      :on-change="onTabChange"
      :tabs="tabs"
    />
    <slot name="tabs.after" />
    <v-data-table
      @input="handleSelectItems"
      @update:page="handlePageChange"
      @update:options="handleOptionsChange"
      @item-expanded="handleItemExpanded"
      @click:row="handleRowClick"
      :class="{ withVerticalScroll }"
      :expanded.sync="expanded"
      :fixed-header="fixedHeader"
      :headers-length="columns ? columns.length : headers.length"
      :headers="columns ? columns : headers"
      :hide-default-header="hideHeader"
      :items="items"
      :loading="loading"
      :server-items-length="itemsLength"
      :show-expand="showExpand"
      :show-select="isSelectable"
      :single-expand="singleExpand"
      :sort-by="sortBy"
      :value="selectedRow"
      class="table"
      hide-default-footer
      must-sort
      loading-text=""
      ref="table"
    >
      <template slot="no-data">
        <text-component class="no-data">
          {{ noDataText }}
        </text-component>
      </template>
      <template
        v-if="additionalHeaders.length"
        #header
      >
        <thead>
          <template v-for="(row, rowIndex) in additionalHeaders">
            <tr :key="rowIndex">
              <template v-for="({ align, bold, colSpan, rowSpan, text, width }, columnIndex) in row">
                <th
                  :style="{ width: width }"
                  :rowspan="rowSpan"
                  :colspan="colSpan"
                  :class="{
                    [`text-${align}`]: align,
                    'depressed': !text,
                  }"
                  :key="columnIndex"
                >
                  <text-component :class="['base-small gray', { 'base-small-bold': bold }]">
                    {{ text }}
                  </text-component>
                </th>
              </template>
            </tr>
          </template>
        </thead>
      </template>
      <template
        v-if="!hideFooter"
        #footer="{ props: { pagination } }"
      >
        <div
          v-if="pagination.itemsLength > 0"
          class="footer"
        >
          <pagination
            @onPageChange="handlePageChange"
            :items-length="pagination.itemsLength"
            :initial-per-page="perPage"
            :active-page-prop="activePage"
          />
        </div>
      </template>
      <template
        v-for="(_, name) in $scopedSlots"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
      <template #[`expanded-item`]="{ item }">
        <td :colspan="headers.length">
          <slot
            name="expanded-item"
            :item="item"
          />
        </td>
      </template>
    </v-data-table>
  </horizontal-scroll>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { DataOptions } from 'vuetify';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { getSortParameterName } from '@/utils';
import { ColumnItem, DataItem, RowOptions, TableHeaders } from './DataTable.types';
import { PageChange } from '@/components/shared/Pagination/Pagination.types';
import { CustomTab, BaseTab } from '@/components/shared/Tabs/Tabs.types';
import HorizontalScroll from '@/components/shared/HorizontalScroll/HorizontalScroll.vue';
import Pagination from '@/components/shared/Pagination/Pagination.vue';
import Tabs from '@/components/shared/Tabs/Tabs.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

@Component({
  name: 'data-table',
  components: {
    HorizontalScroll,
    Pagination,
    Tabs,
    TextComponent,
  },
})
export default class DataTable extends Vue {
  @Prop({ type: Array as PropType<ColumnItem[]> }) readonly columns!: ColumnItem[];
  @Prop({ type: Array as PropType<TableHeaders[]>, default: () => [] }) readonly headers!: TableHeaders[];
  @Prop({ type: Array as PropType<TableHeaders[]>, default: () => [] }) readonly additionalHeaders!: TableHeaders[][];
  @Prop({ type: Array as PropType<DataItem[]>, default: () => [] }) readonly items!: DataItem[];
  @Prop({ type: Array as PropType<CustomTab[] | BaseTab[]> }) readonly tabs!: CustomTab[] | BaseTab[];
  @Prop({ type: String, default: 'Ничего не найдено.' }) readonly noDataText!: string;
  @Prop({ type: Boolean, default: true }) readonly fixedHeader!: boolean;
  @Prop(Function) readonly onPageChange!: (pageNumber: number, perPage: number) => void;
  @Prop(Function) readonly onShowAll!: (isShowAll: boolean) => void;
  @Prop(Function) readonly onTabChange!: (value: unknown) => void;
  @Prop(Number) readonly currentTabIndex!: number;
  @Prop(Boolean) readonly hideFooter!: boolean;
  @Prop(Boolean) readonly hideHeader!: boolean;
  @Prop(Boolean) readonly isSelectable!: boolean;
  @Prop(Boolean) readonly isTabsLoading!: boolean;
  @Prop(Array) readonly selectedRow!: DataItem;
  @Prop(Number) readonly itemsLength!: number;
  @Prop(Boolean) readonly loading!: boolean;
  @Prop(String) readonly title!: string;
  @Prop(Number) readonly perPage!: number;
  @Prop(Boolean) readonly showExpand!: boolean;
  @Prop(Boolean) readonly singleExpand!: boolean;
  @Prop(String) readonly sortBy!: string;
  @Prop(Boolean) readonly withVerticalScroll!: boolean;
  @Prop(Number) readonly activePage!: number;

  expanded: DataItem[] = [];

  sort = '-id';
  page = 0;
  size = 10;

  handleItemExpanded(item: unknown): void {
    this.$emit('onExpandItemClick', item);
  }

  handleSelectItems(values: unknown[]): void {
    this.$emit('input', values);
  }

  handlePageChange(pageChange: PageChange): void {
    const { page, perPage } = pageChange;

    this.page = page - 1;
    this.size = perPage;

    this.$emit(
      'onOptionsChange',
      {
        page: this.page,
        size: this.size,
        sort: this.sort,
      }
    );
  }

  handleOptionsChange(options: DataOptions): void {
    const { sortBy, sortDesc } = options;

    const [sortName] = sortBy;
    const [sortOrder] = sortDesc;
    const sortHeader = this.getHeaderBySortName(sortName) ?? {} as TableHeaders<string>;

    this.sort = getSortParameterName(sortHeader.customSortName || sortName, sortOrder);

    if (this.sort) {
      this.$emit(
        'onOptionsChange',
        {
          page: this.page,
          size: this.size,
          sort: this.sort,
        }
      );
    }
  }

  handleRowClick(expandedRow: unknown, options: RowOptions): void {
    this.showExpand && options.expand(!options.isExpanded);
    this.$emit('onClick', expandedRow);
  }

  getHeaderBySortName(sortName: string): TableHeaders | undefined {
    return this.headers.find((header) => header.value === sortName);
  }

  created(): void {
    this.size = this.perPage;
  }

  @Watch('sort')
  onSortChange(): void {
    this.$emit('onSortChange', this.sort);
  }
}
</script>

<style scoped lang="scss">
  @use "@/assets/styles/_appearance.scss" as appearance;

  @import "@/assets/styles/_variables.scss";

  $bright: map-get($theme-colors, "bright");
  $dark: map-get($theme-colors, "dark");
  $light: map-get($theme-colors, "light");
  $medium: map-get($theme-colors, "medium");
  $primary: map-get($theme-colors, "primary");
  $secondary: map-get($theme-colors, "secondary");
  $white: map-get($theme-colors, "white");

  .table::v-deep {
    width: 100%;

    th {
      border-bottom: 1px solid $bright;
      padding: 8px 16px;
      vertical-align: top;
    }

    td {
      border-bottom: 1px solid $bright;
      color: $dark;
      font-size: 13px !important;
      font-weight: normal;
      line-height: 16px;
      padding: 16px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    &.withVerticalScroll .v-data-table__wrapper {
      max-height: 750px;
    }

    .v-data-table__wrapper {
      border-bottom: 3px solid $bright;
      overflow-y: auto;

      @include appearance.custom_scrollbar();
    }

    .v-data-table__progress th {
      padding: 0;
    }

    .v-data-table-header th {
      border-bottom: 3px solid $medium !important;
      color: $medium !important;
      font-size: 13px !important;
      font-weight: normal !important;
      line-height: 16px !important;
    }

    .v-data-table__expanded__content td {
      padding: 0;
    }

    .v-data-table__empty-wrapper td {
      height: auto;
      padding: 12px 0 0;

      &:not(:empty) {
        border-bottom: 0 !important;
      }
    }

    tbody tr:only-child td {
      border-bottom: 1px solid $bright;
    }

    .v-progress-linear__background,
    .v-progress-linear__indeterminate {
      background-color: $primary !important;
      border-color: $primary !important;
    }

    .v-data-table__checkbox .v-icon {
      color: $primary;
    }

    .v-data-table__expanded__row {
      border-bottom: 1px solid $light !important;
    }

    .v-data-table__expanded__content {
      box-shadow: none !important;
    }

    .v-data-table__expanded__content td .v-data-table {
      background-color: $secondary;
    }

    .no-data {
      border-bottom: 1px solid $bright;
      color: $light;
      display: block;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      padding: 33px 0;
    }
  }

  .footer {
    align-items: center;
    border-bottom: 1px solid $bright;
    display: flex;
    height: 80px;
    justify-content: space-between;
  }

  .pagination {
    align-items: center;
    display: flex;
  }

  .depressed {
    box-shadow: none !important;
  }
</style>
