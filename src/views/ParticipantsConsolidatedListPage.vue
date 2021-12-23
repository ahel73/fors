<template>
  <main-layout
    :title="mainLayoutText"
  >
    <v-row>
      <v-col>
        <data-table
          @onOptionsChange="handleOptionsChange"
          @onSortChange="saveColumns"
          :headers="headers"
          :per-page="size"
          :items="participants"
          :sort-by="initialSort"
        >
          <template #[`tabs.after`]>
            <v-row>
              <v-col
                cols="8"
                class="d-flex align-end"
              >
                <filter-component
                  @onSearch="handleSearch"
                  @onReset="handleReset"
                  :initial-items="items"
                  :filters="filters"
                />
              </v-col>
              <v-col
                cols="4"
                class="d-flex flex-column justify-end"
              >
                <v-row>
                  <v-col cols="8">
                    <select-component
                      v-model="region"
                      variant="micro"
                      label="Субъект"
                      :items="regions"
                    />
                  </v-col>
                  <v-col cols="4">
                    <select-component
                      v-model="year"
                      variant="micro"
                      label="Финансовый год"
                      :items="years"
                    />
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                  <button-component
                    @click="onAcceptSearchClick()"
                    title="Применить"
                    size="micro"
                    variant="primary"
                    style="margin-right: 15px"
                  />
                  <button-component
                    @click="onCancelSearchClick()"
                    title="Отменить"
                    size="micro"
                    style="margin-right: 15px"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row class="mb-8">
              <v-col
                cols="12"
                class="d-flex align-start"
              >
                <columns-view
                  @saveColumns="saveColumns"
                  :headers.sync="headers"
                  :columns="columns"
                />
                <icon-button
                  @click.prevent.native="onDownloadClick()"
                  type="text"
                  text="Экспорт списка"
                  class="ml-4"
                >
                  <template #prependIcon>
                    <icon-component
                      :width="18"
                      :height="18"
                    >
                      <download-icon />
                    </icon-component>
                  </template>
                </icon-button>
                <upload-file-component
                  @onChange="(file) => uploadFile(file)"
                  @downloadFile="downloadFile"
                  @deleteFile="(id) => deleteFile(id)"
                  label="Загрузить список"
                  :files-list="fileList"
                  clearable
                  :disabled="isReadonly"
                />
              </v-col>
            </v-row>
          </template>
          <template #[`item.deedWorkEmployerShortNameWithFunc`]="{ item }">
            {{ getDeedWorkString(item) }}
          </template>
          <template #[`item.registrationDate`]="{ item }">
            {{ getRegistrationDate(item.deedRegistrationDate) }}
          </template>
          <template #[`item.budgets`]="{ item }">
            {{ item }}
          </template>
          <template #[`item.actions`]="{ item: { id } }">
            <div class="d-flex justify-center flex-nowrap">
              <span class="table-action__wrapper">
                <base-action
                  @click="onEditClick(id)"
                  hint="Смотреть"
                >
                  <template #customIcon>
                    <v-icon>
                      mdi-eye
                    </v-icon>
                  </template>
                </base-action>
              </span>
            </div>
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row>
      <button-component
        title="Исключить участника"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        v-if="false"
        title="Добавить участника"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Перевести в другой список"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        v-if="false"
        title="На доработку"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Утвердить"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import MainLayout from '@/layouts/MainLayout.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import ColumnsView from '@/components/shared/table/ColumnsView/ColumnsView.vue';
import { Columns } from '@/components/shared/table/ColumnsView/ColumnsView';
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import DownloadIcon from '@/components/shared/IconComponent/icons/DownloadIcon.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { TableHeaders } from '@/components/shared/table/DataTable.types';
import { OutputFilters } from '@/components/shared/Filter/FilterTypes/types';
import moment from 'moment';
import { FilterTypeNames, FilterTypes, ValueTypes } from '@/components/shared/Filter/types';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import { Pagination } from '@/types/Pagination';

@Component({
  name: 'ParticipantsList',
  components: {
    MainLayout,
    DataTable,
    ColumnsView,
    FilterComponent,
    SelectComponent,
    IconButton,
    IconComponent,
    DownloadIcon,
    ButtonComponent,
    BaseAction,
  },
})

export default class ParticipantsConsolidatedListPage extends Vue {
  store: Store = useStore(this.$store);
  deleteDialog = false

  items: OutputFilters = [];
  size: string | number = 10;
  page: string | number = 0;
  sort: string | undefined = '-id';
  initialSort: string | undefined = '-id';

  year = null;
  region = null;

  fileList = [];

  get filters(): FilterTypes {
    return {
      multiFilters: [
        {
          name: 'search',
          like: true,
          label: 'Поиск',
          names: this.fields,
          isDefault: true,
          defaultValue: '',
          valueType: ValueTypes.STRING,
          type: FilterTypeNames.MULTI_FILTER,
        },
      ],
      simpleFilters: [
        {
          defaultValue: '',
          isDefault: true,
          label: 'Фамилия Имя Отчество',
          name: 'deedApplicantFullName',
          valueType: ValueTypes.STRING,
          type: FilterTypeNames.SIMPLE_FILTER,
        },
      ],
      selectFilters: [
        // {
        //   isDefault: false,
        //   isCustom: true,
        //   items: this.computedRegions,
        //   label: 'Муниципальный район',
        //   name: 'programId',
        //   type: FilterTypeNames.SELECT_FILTER,
        //   valueType: ValueTypes.NUMBER,
        // },
      ],
    };
  }

  headers: TableHeaders[] = [];

  columns: Columns[] = [
    { isDefault: true, text: '№ очереди', value: 'queueNum', sortable: false },
    { isDefault: true, text: 'Фамилия Имя Отчество', value: 'deedApplicantFullName', sortable: false },
    { isDefault: true, text: 'Место работы, должность', value: 'deedWorkEmployerShortNameWithFunc', sortable: false },
    { isDefault: true, text: 'Сфера занятости', value: 'deedEmploymentName', sortable: false },
    { isDefault: true, text: 'Направление расходования средств', value: 'deedSpendingDirectionName', sortable: false },
    { isDefault: true, text: 'Приоритет', value: 'deedQueuePriorityName', sortable: false },
    { isDefault: true, text: 'Дата постановки на учёт', value: 'registrationDate', sortable: false },
    { isDefault: true, text: 'Тестовое значение', value: 'budgets', sortable: false },
    {
      isDefault: true,
      value: 'actions',
      text: 'Действия',
      sortable: false,
      isVisible: false,
      isEditable: false,
      align: 'center',
    },
  ]

  get mainLayoutText() {
    return `Сводный список участников ${this.processedYear}`;
  }

  get processedYear() {
    if (!this.year) return '';
    return this.year + ' год';
  }

  get regions() {
    return this.store.participants.state?.regions;
  }

  get years() {
    return this.store.participants.state?.financialYears;
  }

  get participants() {
    return this.store.participantsConsolidated.state?.items;
  }

  get fields(): string[] {
    return this.headers.reduce<string[]>((fields, { value }) => {
      return value === 'actions' ? fields : [...fields, value];
    }, []);
  }

  getDeedWorkString(item: any) {
    if (!item.deedWorkEmployerShortName || !item.deedWorkFunc) return '';
    return item.deedWorkEmployerShortName + ', ' + item.deedWorkFunc;
  }

  getRegistrationDate(item: string) {
    return moment(item).format('DD.MM.YYYY HH:mm');
  }

  mounted() {
    this.store.participants.fetchImprovingWays().then((improvingWay) => {
      this.store.participantsConsolidated.fetchItems({});
      this.store.participants.fetchRegions();
      this.store.participants.fetchYears();
      this.store.me.fetchMe();
    });
  }

  handleSearch(outputFilters: OutputFilters): void {
    this.items = outputFilters;
    this.store.participants.fetchMembers(
      {
        listMembersFinancialYear: this.year,
        items: this.items,
        size: this.size.toString(),
        sort: this.sort,
        page: this.page.toString(),
      }
    );
  }

  handleReset(): void {
    this.items = [];
  }

  onEditClick(id: number) {
    this.$router.push({ name: 'PayoutParticipantFormPage', params: { id: id.toString() } });
  }

  onCancelSearchClick() {
    this.region = null;
    this.year = null;
  }

  onAcceptSearchClick() {
    this.store.participants.setSearch(this.year, this.region);
    this.store.participants.fetchMembers(
      {
        listMembersFinancialYear: this.year,
        items: this.items,
        size: this.size.toString(),
        sort: this.sort,
        page: this.page.toString(),
      }
    );
  }

  handleOptionsChange(options: Pagination): void {
    const { page, size, sort } = options;

    this.sort = sort;
    this.size = size;
    this.page = page;

    this.store.participants.fetchMembers(
      {
        listMembersFinancialYear: this.year,
        items: this.items,
        size: this.size.toString(),
        sort: this.sort,
        page: this.page.toString(),
      }
    );
  }

  onAddClick() {
    console.log('Добавляем файл');
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
