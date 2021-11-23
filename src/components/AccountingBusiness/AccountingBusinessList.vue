<template>
  <main-layout title="Список учетных дел">
    <v-col>
      <data-table :headers="headers" :items="measuresItems">
        <template #[`tabs.after`]>
          <v-row>
            <v-col cols="12" class="d-flex align-start">
              <filter-component
                @onSearch="handleSearch"
                @onReset="handleReset"
                :filters="filters"
                :initial-items="items"
                eager
              />
            </v-col>
          </v-row>
          <v-row class="mb-8">
            <v-col cols="12" class="d-flex align-start">
              <columns-view @saveColumns="saveColumns" />
              <icon-button
                @click="handleExportMeasuresInXlsx"
                type="text"
                text="Экспорт списка"
                class="ml-4"
                icon="mdi-arrow-collapse-down"
              />
              <router-link to="/accountingBusiness/create">
                <icon-button
                  @click="handleOpenMeasure"
                  class="ml-3"
                  type="text"
                  icon="mdi-plus-circle"
                  text="Добавить"
                />
              </router-link>
            </v-col>
          </v-row>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex justify-center flex-nowrap">
            <span class="table-action__wrapper">
              <router-link
                :to="{
                  name: 'accountingBusiness-card',
                  params: { id: item.id, type: 'edit' },
                }"
              >
                <base-action
                  @click="handleOpenMeasure({ id: item.id })"
                  hint="Редактировать"
                >
                  <edit-icon />
                </base-action>
              </router-link>
            </span>
            <span class="table-action__wrapper">
              <base-action @click="handleDeleteMeasure()" hint="Удалить">
                <delete-icon />
              </base-action>
            </span>
            <span class="table-action__wrapper">
              <router-link
                :to="{
                  name: 'accountingBusiness-card',
                  params: { id: item.id, type: 'show' },
                }"
              >
                <base-action @click="handleOpenMeasure()" hint="Просмотр">
                  <eye-icon />
                </base-action>
              </router-link>
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
import ButtonComponent from '../shared/buttons/DefaultButton.vue';
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
  searchName = '';
  fields = ['name', 'dsdf', 'sdfsf'];
  items = [{
    items: [
      {
        text: 'id',
        value: '1',
        code: '1',
      },
    ],
    /* isCustom: 'true',
    isDefault: 'true',
    label: 'string',
    like: 'true',
    name: 'string',
    names: 'string',
    negative: 'true',
    order: '2', */
  }];

  isDeleteMeasureDialogShow = false;

  get filters() {
    return {
      multiFilters: [
        {
          name: 'search',
          like: true,
          label: 'Поиск',
          names: this.fields,
          isDefault: true,
          defaultValue: '',
        },
      ],
    };
  }

  get measuresItems() {
    return [
      {
        id: 13,
        regDate: '2011-11-11', // дата постановки на учет
        area: 33, // размер общей площади
        applicant: { // для фио
          id: 1,
          surname: 'testovich',
          name: 'test',
          patronymic: null,
          fullName: 'testovich test',
        },
        improvingWay: { // способ улучшения
          id: 1,
          code: '1  ',
          name: 'социальная выплата',
        },
        employment: { // сфера деяятельности
          id: 1,
          code: '1',
          name: 'АПК/Ветеринария',
        },
        queuePriority: { // приоритет
          id: 1,
          code: '1',
          name: 'Многодетная семья',
        },
        familyMembers: [],
        documents: [],
        spendingDirection: {
          id: 1,
          code: '1',
          name: 'строительство',
        },
        oktmo: {
          id: 1,
          code: null,
          name: null,
          areaName: null,
          createDate: null,
          updateDate: null,
          regioncode: null,
          areacode: null,
          citycode: null,
          localcode: null,
          controlnum: null,
          section: null,
          clarification: null,
          lastChangeNum: null,
          lastChangeType: null,
        },
        createDate: '2021-11-23T13:56:14.80455',
        createUser: null,
        changeUser: null,
        changeDate: null,
        changeReason: null,
        lkSubId: 1,
        status: { // статус
          id: 1,
          name: 'Черновик',
        },
      },
    ];
  }

  headers = [
    {
      text: 'Фамилия Имя Отчество',
      value: 'applicant.fullName',
    },
    {
      text: 'Способ улучшения ЖУ',
      value: 'improvingWay.name',
    },
    {
      text: 'Сфера деятельности',
      value: 'employment.name',
    },
    {
      text: 'Приоритет',
      value: 'queuePriority.name',
    },
    {
      text: 'Размер общей площади',
      value: 'area',
    },
    {
      text: 'Расчетный объем средств',
      value: 'amount_funds',
    },
    {
      text: 'Дата постановки на учет',
      value: 'regDate',
    },
    {
      text: 'Статус',
      value: 'status.name',
    },
    {
      text: 'Действия',
      value: 'actions',
    },
  ];

  columns = [
    {
      isDefault: false,
      text: 'РФ/Субъект РФ',
      value: 'oktmoName',
    },
    {
      isDefault: false,
      text: 'ГРБС',
      value: 'headName',
    },
    {
      isDefault: false,
      text: 'Рз и ПР',
      value: 'sectionName',
    },
    {
      isDefault: false,
      text: 'П',
      value: 'programName',
    },
    {
      isDefault: false,
      text: 'ПП',
      value: 'subprogramName',
    },
    {
      isDefault: false,
      text: 'М',
      value: 'mainMeasureName',
    },
    {
      isDefault: false,
      text: 'НР',
      value: 'costDirectionName',
    },
    {
      isDefault: false,
      text: 'ВР',
      value: 'costTypeName',
    },
    {
      isDefault: true,
      isEditable: false,
      text: 'КБК',
      value: 'kbkCode',
    },
    {
      isDefault: true,
      isEditable: false,
      text: 'Наименование',
      value: 'name',
    },
    {
      isDefault: true,
      isEditable: false,
      text: 'Статус',
      value: 'statusName',
    },
    {
      value: 'actions',
      text: 'Действия',
      sortable: false,
      isVisible: false,
      isEditable: false,
      isDefault: true,
      align: 'center',
    },
  ];

  handleSearch() {
    console.log('handleSearch');
  }

  saveColumns() {
    console.log('saveColumns');
  }

  handleReset() {
    console.log('handleReset');
  }

  handleResetSearch() {
    console.log('handleResetSearch');
  }

  handleDeleteMeasure(measureDeleteId: number) {
    console.log(measureDeleteId);

    this.isDeleteMeasureDialogShow = true;
  }

  handleDeleteMeasureSuccess() {
    /*  const { measureDeleteId } = this;

    if (measureDeleteId) {
      await this.store.measure.deleteMeasureData(measureDeleteId);

      this.fetchMeasures();
      this.measureDeleteId = null;
    } */
  }

  handleOpenMeasure() {
    console.log('handleOpenMeasure');
  }

  handleExportMeasuresInXlsx() {
    console.log('handleExportMeasuresInXlsx');
  }
}
</script>

<style scoped lang="scss">
.table-action__wrapper {
  width: 28px;
}
</style>
