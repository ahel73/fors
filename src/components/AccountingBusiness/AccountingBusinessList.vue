<template>
  <main-layout title="Список учетных дел">
    <v-col>
      <data-table
        @onOptionsChange="handleOptionsChange"
        :headers="headers"
        :items="stateDeedState.data"
        :items-length="stateDeedState.total"
        :loading="stateDeedState.isLoading"
        :no-data-text="noDataText"
        :per-page="size"
        :sort-by="initialSort"
      >
        <template #[`tabs.after`]>
          <v-row>
            <v-col
              cols="12"
              class="d-flex align-start"
            >
              <filter-component
                @onSearch="handleSearch"
                @onReset="handleReset"
                :initial-items="items"
                :filters="filters"
              />
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
                @click="handleExportDeedInXlsx"
                type="text"
                text="Экспорт списка"
                class="ml-4"
                icon="mdi-arrow-collapse-down"
              />
              <router-link
                :to="{
                  name: 'accountingBusinessCardCreate',
                  params: { type: 'create' },
                }"
              >
                <icon-button
                  class="ml-3"
                  type="text"
                  icon="mdi-plus-circle"
                  text="Добавить"
                />
              </router-link>
            </v-col>
          </v-row>
        </template>
        <template #[`item.registrationDate`]="{ value }">
          <span v-if="value">
            {{ formatDate(value) }}
          </span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex justify-start flex-nowrap">
            <span class="table-action__wrapper">
              <router-link
                :to="{
                  name: 'accountingBusiness-card',
                  params: { id: item.id, type: 'show' },
                }"
              >
                <base-action
                  @click="handleOpenView(item.id)"
                  hint="Просмотр"
                >
                  <eye-icon />
                </base-action>
              </router-link>
            </span>

            <span class="table-action__wrapper">
              <router-link
                :to="{
                  name: 'accountingBusiness-card',
                  params: { id: item.id, type: 'edit' },
                }"
              >
                <base-action
                  @click="handleOpenDeedItem(item.id)"
                  hint="Редактировать"
                >
                  <edit-icon />
                </base-action>
              </router-link>
            </span>
            <span
              v-if="item.statusName === 'Черновик'"
              class="table-action__wrapper"
            >
              <base-action
                @click="handleDeleteDeed(item.id)"
                hint="Удалить"
              >
                <delete-icon />
              </base-action>
            </span>
          </div>
        </template>
      </data-table>
    </v-col>
    <dialog-component
      v-model="isDeleteMeasureDialogShow"
      @onSuccess="handleDeleteMeasureSuccess"
      cancel-title="Отменить"
      confirm-title="Продолжить"
      width="600"
      prompt
    >
      <template #title>
        <text-component variant="h4">
          Запись будет удалена. Вы уверены?
        </text-component>
      </template>
    </dialog-component>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import IconButton from '../shared/buttons/IconButton.vue';
import FilterComponent from '../shared/Filter/Filter.vue';
import InputComponent from '../shared/inputs/InputComponent.vue';
import ColumnsView from '../shared/table/ColumnsView/ColumnsView.vue';
import DataTable from '../shared/table/DataTable.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import DeleteIcon from '@/components/shared/IconComponent/icons/DeleteIcon.vue';
import EditIcon from '@/components/shared/IconComponent/icons/EditIcon.vue';
import EyeIcon from '@/components/shared/IconComponent/icons/EyeIcon.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import DialogComponent from '@/components/shared/Dialog/Dialog.vue';
import TextComponent from '@/components/shared/Text/Text.vue';
import { useStore } from 'vuex-simple';

import Store from '@/store/store';
import {
  FilterTypeNames,
  FilterTypes,
  ValueTypes,
} from '../shared/Filter/types';
import { OutputFilters } from '../shared/Filter/FilterTypes/types';
import { Pagination } from '@/types/Pagination';
import { getFieldsToSort } from '@/utils/getFieldsToSort';
import { ReplaceConditions } from '@/types';
import { dateIsValid, getFormattedDate } from '@/utils';
import { Columns } from '../shared/table/ColumnsView/ColumnsView';
import { Status } from '@/types/Status';
import { IndividualPersonInfo } from '@/types/IndividualPersonInfo';
import { ImprovingWay } from '@/types/ImprovingWay';
import { Employment } from '@/types/Employment';
import { Priority } from '@/types/Priority';

@Component({
  name: 'accountingBusinessList',
  components: {
    InputComponent,
    ButtonComponent,
    FilterComponent,
    DataTable,
    ColumnsView,
    IconButton,
    MainLayout,
    DeleteIcon,
    EditIcon,
    EyeIcon,
    BaseAction,
    DialogComponent,
    TextComponent,
  },
})
export default class AccountingBusinessList extends Vue {
  store: Store = useStore(this.$store);
  searchName = '';
  deedDeleteId: number | string = '';
  items: OutputFilters = [];
  size: number | string = 10;
  page: number | string = 0;
  sort: string | undefined = '-id';
  initialSort: string | undefined = '-id';
  filter = {
    applicantId: null,
    improvingWayId: null,
    employmentId: null,
    queuePriorityId: null,
    statusId: null,
  };

  isDeleteMeasureDialogShow = false;

  get filters(): FilterTypes {
    return {
      selectFilters: [
        {
          name: 'name',
          label: 'Фамилия Имя Отчество',
          items: this.individualPersonInfoController,
          isDefault: true,
          like: true,
          showCode: true,
          valueType: ValueTypes.STRING,
          type: FilterTypeNames.SELECT_FILTER,
        },
        {
          name: 'improvingWayId',
          label: 'Способ улучшения ЖУ',
          items: this.improvingWayController,
          isDefault: true,
          showCode: true,
          valueType: ValueTypes.NUMBER,
          type: FilterTypeNames.SELECT_FILTER,
        },
        {
          name: 'employmentId',
          label: 'Сфера деятельности',
          items: this.employmentController,
          isDefault: true,
          showCode: true,
          valueType: ValueTypes.NUMBER,
          type: FilterTypeNames.SELECT_FILTER,
        },
        {
          name: 'queuePriority',
          label: 'Приоритет',
          items: this.queuePriorityController,
          isDefault: true,
          showCode: true,
          valueType: ValueTypes.NUMBER,
          type: FilterTypeNames.SELECT_FILTER,
        },
        {
          name: 'statusId',
          label: 'Статус',
          items: this.deedStatus,
          isDefault: true,
          showCode: true,
          valueType: ValueTypes.NUMBER,
          type: FilterTypeNames.SELECT_FILTER,
        },
      ],
    };
  }

  headers = [
    {
      text: 'Фамилия Имя Отчество',
      value: 'applicantFullName',
      width: '200px',
    },
    {
      text: 'Способ улучшения ЖУ',
      value: 'improvingWayName',
      width: '200px',
    },
    {
      text: 'Сфера деятельности',
      value: 'employmentName',
      width: '200px',
    },
    {
      text: 'Приоритет',
      value: 'queuePriorityName',
      width: '200px',
    },
    {
      text: 'Нормативная площадь',
      value: 'normativeArea',
      width: '200px',
    },
    {
      text: 'Направление расходования средств',
      value: 'spendingDirectionName',
      width: '200px',
    },
    {
      text: 'Дата постановки на учет',
      value: 'registrationDate',
      width: '200px',
    },
    {
      text: 'Статус',
      value: 'statusName',
      width: '200px',
    },
    {
      text: 'Действия',
      value: 'actions',
      align: 'start',
      width: '200px',
    },
  ];

  columns: Columns[] = [
    {
      isDefault: true,
      isEditable: false,
      text: 'Фамилия Имя Отчество',
      value: 'applicantFullName',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Способ улучшения ЖУ',
      value: 'improvingWayName',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Сфера деятельности',
      value: 'employmentName',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Направление расходования средств',
      value: 'spendingDirectionName',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Приоритет',
      value: 'queuePriorityName',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Нормативная площадь',
      value: 'normativeArea',
      align: 'center',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Дата постановки на учет',
      value: 'registrationDate',
    },
    {
      isDefault: true,
      isEditable: true,
      text: 'Статус',
      value: 'statusName',
    },
    {
      value: 'actions',
      text: 'Действия',
      isEditable: false,
      isDefault: true,
      sortable: false,
      align: 'start',
    },
  ];

  mounted() {
    this.fetchStateDeed();
    this.fetchControllerData();
  }

  get stateDeedState() {
    return this.store.deed.state;
  }

  get deedStatus() {
    return this.store.directory.state.deedStatus.map((item: Status) => ({
      text: item.name,
      value: item.id,
    }));
  }

  get individualPersonInfoController() {
    return this.store.directory.state.personInfo.map((item: IndividualPersonInfo) => ({
      text: item.fullName,
      value: item.id,
    }));
  }

  get improvingWayController() {
    return this.store.directory.state.improvingWay.map((item: ImprovingWay) => ({
      text: item.name,
      value: item.id,
    }));
  }

  get employmentController() {
    return this.store.directory.state.employment.map((item: Employment) => ({
      text: item.name,
      value: item.id,
    }));
  }

  get queuePriorityController() {
    return this.store.directory.state.priority.map((item: Priority) => ({
      text: item.name,
      value: item.id,
    }));
  }

  get noDataText(): string {
    const { error } = this.stateDeedState;
    return error ? error.message : 'Данные отсутствуют';
  }

  formatDate(date: string): string | null {
    return dateIsValid(date) ? getFormattedDate(date) : null;
  }

  fetchStateDeed() {
    const { store, items, page, size, sort, filter } = this;

    const fieldsToReplace: ReplaceConditions[] = [
      { from: 'periodFrom', to: 'periodFromCode, periodToCode' },
    ];

    store.deed.fetchDeedControllerData({
      items,
      page,
      size,
      sort: getFieldsToSort(fieldsToReplace, sort),
      filter,
    });
  }

  handleOptionsChange(options: Pagination): void {
    const { page, size, sort } = options;

    this.sort = sort || this.sort;
    this.size = +size;
    this.page = +page;

    this.fetchStateDeed();
  }

  fetchControllerData() {
    const params = {
      deed: true,
    };
    this.store.directory.fetchDeedStatusController();
    this.store.directory.fetchEmploymentController();

    this.store.directory.fetchIndividualPersonInfoController(params);
    this.store.directory.fetchImprovingWayController();
    this.store.directory.fetchQueuePriorityController();
  }

  handleSearch(outputFilters: OutputFilters): void {
    this.filter = {
      applicantId: null,
      improvingWayId: null,
      employmentId: null,
      queuePriorityId: null,
      statusId: null,
    };
    outputFilters.filter((item) => {
      const [itemValue]: any = item.value;
      if (item.name === 'name') {
        this.filter.applicantId = itemValue?.value;
      } else if (item.name === 'improvingWayId') {
        this.filter.improvingWayId = itemValue?.value;
      } else if (item.name === 'employmentId') {
        this.filter.employmentId = itemValue?.value;
      } else if (item.name === 'queuePriority') {
        this.filter.queuePriorityId = itemValue?.value;
      } else if (item.name === 'statusId') {
        this.filter.statusId = itemValue?.value;
      }
    });

    this.fetchStateDeed();
  }

  saveColumns(): void {
    const data = { columns: this.columns, sort: this.sort, items: this.items };
  }

  handleReset(): void {
    this.items = [];
    this.filter = {
      applicantId: null,
      improvingWayId: null,
      employmentId: null,
      queuePriorityId: null,
      statusId: null,
    };
  }

  async handleOpenView(id: number | string) {
    await this.store.deedItem.fetchDeedControllerItem(id);
  }

  handleDeleteDeed(deedDeleteId: number) {
    this.deedDeleteId = deedDeleteId;
    this.isDeleteMeasureDialogShow = true;
  }

  async handleDeleteMeasureSuccess() {
    if (this.deedDeleteId) {
      await this.store.deleteItem.fetchDeleteDeedController(this.deedDeleteId);
      this.fetchStateDeed();
      this.deedDeleteId = '';
    }
  }

  async handleOpenDeedItem(id: string) {
    await this.store.deedItem.fetchDeedControllerItem(id);
  }

  handleExportDeedInXlsx() {
    // ToDo handleExportDeedInXlsx
  }
}
</script>

<style scoped lang="scss">
.table-action__wrapper {
  width: 28px;
}
</style>
