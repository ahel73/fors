<template>
  <main-layout title="Список учетных дел">
    <v-col>
      <data-table
        @onSortChange="saveColumns"
        :headers="headers"
        :items="measuresItems"
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
              <base-action
                @click="handleDeleteDeed(item.id)"
                hint="Удалить"
              >
                <delete-icon />
              </base-action>
            </span>
            <!-- <span class="table-action__wrapper">
              <router-link
                :to="{
                  name: 'accountingBusiness-card',
                  params: { id: item.id, type: 'show' },
                }"
              >
                <base-action
                  @click="handleOpenMeasure()"
                  hint="Просмотр"
                >
                  <eye-icon />
                </base-action>
              </router-link>
            </span> -->
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
import { useStore } from 'vuex-simple';

import Store from '@/store/store';
import { FilterTypeNames, FilterTypes, ValueTypes } from '../shared/Filter/types';
import {
  deleteDeedController,
  getDeedController,
  getDeedStatusController,
  getDocGroupController,
  getEmploymentController,
  getImprovingWayController,
  getIndividualPersonInfoController,
  getOktmoController,
  getQueuePriorityController,
  getSpendingDirectionController,
} from '@/data/services/accountingBisiness/accountingBisiness';
import { OutputFilters } from '../shared/Filter/FilterTypes/types';
import { isEmpty } from 'lodash';

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
  deedDeleteId: number | string = '';
  items: OutputFilters = [];
  size: number | string = 10;
  page: number | string = 0;
  sort: string | undefined = '-id';
  initialSort: string | undefined = '-id';
  subPrograms = [];
  store = useStore(this.$store);
  measuresItems = [];
  docGroupController = [];
  employmentController = [];
  improvingWayController = [];
  queuePriorityController = [];
  spendingDirectionController = [];
  oktmoController = [];
  deedStatusController = [];
  individualPersonInfoController = [];
  filter = {};

  isDeleteMeasureDialogShow = false;

  get filters(): FilterTypes {
    return {
      selectFilters: [
        {
          name: 'name', // поле по которому ищет бэк
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
          // defaultValue: this.programIds,
          items: this.improvingWayController,
          isDefault: true,
          // multiple: true,
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
          items: this.deedStatusController,
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
     isDefault: true,
     text: 'Фамилия Имя Отчество',
     value: 'applicant.fullName',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Способ улучшения ЖУ',
     value: 'improvingWay.name',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Сфера деятельности',
     value: 'employment.name',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Приоритет',
     value: 'queuePriority.name',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Размер общей площади',
     value: 'area',
     align: 'center',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Расчетный объем средств',
     value: 'amount_funds',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Дата постановки на учет',
     value: 'createDate',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Статус',
     value: 'status.name',
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

 mounted() {
   // eslint-disable-next-line no-unused-expressions
   // this.store.deed.state.data;
   this.getDeedController();
   this.getControllerData();
 }

 getDeedController() {
   getDeedController().then(data => {
     this.measuresItems = data.data;
   });
 }

 getControllerData() {
   getDocGroupController().then((data) => {
     this.docGroupController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getEmploymentController().then((data) => {
     this.employmentController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getImprovingWayController().then((data) => {
     this.improvingWayController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getQueuePriorityController().then((data) => {
     this.queuePriorityController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getSpendingDirectionController().then((data) => {
     this.spendingDirectionController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getOktmoController().then((data) => {
     this.oktmoController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getDeedStatusController().then((data) => {
     this.deedStatusController = data.data.map((item: any) => ({
       text: item.name,
       value: item.id,
     }));
   });

   getIndividualPersonInfoController().then((data) => {
     this.individualPersonInfoController = data.data.map((item: any) => ({
       text: item.fullName,
       value: item.id,
     }));
   });
 }

 handleSearch(outputFilters: OutputFilters): void {
   console.log(outputFilters, 'outputFilters');

   outputFilters.forEach(item => {
     console.log(item.value[0], 'hh');
     // const val = Object.assign({`${item.name}`: item.name });
     // console.log(val, 'nn');
   });
 }

 saveColumns(): void {
   const data = { columns: this.columns, sort: this.sort, items: this.items };
   // saveRegistrySettings({ data: data, registry: RegistryType.PROGRAMS });
 }

 handleReset(): void {
   this.items = [];
 }

 handleResetSearch() {
   console.log('handleResetSearch');
 }

 handleDeleteDeed(deedDeleteId: number) {
   console.log(deedDeleteId, 'deedDeleteId');
   this.deedDeleteId = deedDeleteId;
   this.isDeleteMeasureDialogShow = true;
 }

 handleDeleteMeasureSuccess() {
   if (this.deedDeleteId) {
     deleteDeedController(this.deedDeleteId);

     this.getDeedController();
     this.deedDeleteId = '';
   }
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
