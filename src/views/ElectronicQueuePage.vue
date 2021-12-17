<template>
  <main-layout title="Очередь участников на улучшение УЖУ">
    <v-row>
      <v-col>
        <data-table
          @onOptionsChange="handleOptionsChange"
          :headers="headers"
          :items="stateElectronicQueueState.data"
          :items-length="stateElectronicQueueState.total"
          :loading="stateElectronicQueueState.isLoading"
          :no-data-text="noDataText"
          :per-page="size"
          :sort-by="initialSort"
        >
          <template #[`item.check`]="{item: stateElectronicQueueData}">
            <base-action hint="Выбрать">
              <template #customIcon>
                <checkbox-component
                  v-model="checkedProperties"
                  :initial-value="stateElectronicQueueData"
                  hide-details
                  multiple
                />
              </template>
            </base-action>
          </template>
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
                  eager
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
                  @click="handleExporInXlsx"
                  type="text"
                  text="Экспорт списка"
                  class="ml-4"
                  icon="mdi-arrow-collapse-down"
                />
                <router-link
                  :to="{
                    name: '',
                    params: { type: 'create' },
                  }"
                >
                  <icon-button
                    class="ml-3"
                    type="text"
                    text="Сформировать список участников"
                  />
                </router-link>
              </v-col>
            </v-row>
          </template>
          <template #[`item.actions`]="{ }">
            <div class="d-flex justify-center flex-nowrap">
              <span class="table-action__wrapper">
                <checkbox-component />
              </span>
            </div>
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row>
      <button-component
        @click.prevent.native="onConformClick()"
        title="В архив"
        size="micro"
        style="margin-right: 15px"
      />
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from '@/layouts/MainLayout.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import ColumnsView from '@/components/shared/table/ColumnsView/ColumnsView.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { OutputFilters } from '@/components/shared/Filter/FilterTypes/types';
import { ReplaceConditions } from '@/types';
import { getFieldsToSort } from '@/utils/getFieldsToSort';
import Store from '@/store/store';
import { useStore } from 'vuex-simple';
import { Pagination } from '@/types/Pagination';
import { FilterTypeNames, FilterTypes, ValueTypes } from '@/components/shared/Filter/types';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';

@Component({
  name: 'ElectronicQueueList',
  components: {
    InputComponent,
    FilterComponent,
    DataTable,
    ColumnsView,
    IconButton,
    MainLayout,
    BaseAction,
    ButtonComponent,
    CheckboxComponent,
  },
})

export default class ElectronicQueuePageList extends Vue {
  store: Store = useStore(this.$store);
  items: OutputFilters = [];
  size: number | string = 10;
  page: number | string = 0;
  sort: string | undefined = '-id';
  initialSort: string | undefined = '-id';
  filter = {
    applicantId: null,
    groupNum: null,
    improvingWayId: null,
    employmentId: null,
    queuePriorityId: null,
    statusId: null,
  };

  checkedProperties: any = [];

  headers = [
    {
      sortable: false,
      value: 'check',
    },
    {
      text: '№ очереди в группе',
      value: 'queueNum',
    },
    {
      text: 'Группа',
      value: 'groupNum',
    },
    {
      text: 'Фамилия Имя Отчество',
      value: 'applicantFullName',
    },
    {
      text: 'Способ улучшения жилья',
      value: 'improvingWayName',
    },
    {
      text: 'Сфера занятости',
      value: 'employmentName',
    },
    {
      text: 'Приоритет',
      value: 'queuePriorityName',
    },
    {
      text: 'Дата постановки на учет',
      value: 'registrationDate',
    },
    {
      text: 'Дата изменения',
      value: 'numChangeDate',
    },
    {
      text: 'Статус',
      value: 'statusName',
    },
  ];

 columns = [
   {
     // text:'',
     isVisible: false,
     isDefault: true,
     value: 'check',
   },
   {
     isDefault: true,
     isEditable: false,
     text: '№ очереди в группе',
     value: 'queueNum',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Группа',
     value: 'groupNum',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Фамилия Имя Отчество',
     value: 'applicantFullName',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Способ улучшения жилья',
     value: 'improvingWayName',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Сфера занятости',
     value: 'employmentName',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Приоритет',
     value: 'queuePriorityName',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Дата постановки на учет',
     value: 'registrationDate',
   },
   {
     isDefault: false,
     isEditable: true,
     text: 'Дата изменения',
     value: 'numChangeDate',
     align: 'center',
   },
   {
     isDefault: true,
     isEditable: false,
     text: 'Статус',
     value: 'statusName',
   },
 ];

 mounted() {
   this.fetchStateElectronicQueue();
   this.fetchControllerData();
 }

 get filters(): FilterTypes {
   return {
     selectFilters: [
       {
         name: 'applicantId',
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
         label: 'Способ улучшения жилья',
         items: this.improvingWayController,
         isDefault: true,
         showCode: true,
         valueType: ValueTypes.NUMBER,
         type: FilterTypeNames.SELECT_FILTER,
       },
       {
         name: 'employmentId',
         label: 'Сфера занятости',
         items: this.employmentController,
         isDefault: true,
         showCode: true,
         valueType: ValueTypes.NUMBER,
         type: FilterTypeNames.SELECT_FILTER,
       },
       {
         name: 'queuePriorityId',
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
         items: this.queueQueueStatusController,
         isDefault: true,
         showCode: true,
         valueType: ValueTypes.NUMBER,
         type: FilterTypeNames.SELECT_FILTER,
       },
     ],
     simpleFilters: [
       {
         name: 'groupNum',
         label: 'Группа',
         defaultValue: '',
         isDefault: true,
         like: true,
         valueType: ValueTypes.STRING,
         type: FilterTypeNames.SIMPLE_FILTER,
       },
     ],
   };
 }

 get individualPersonInfoController() {
   return this.store.directory.state.personInfo.map((item: any) => ({
     text: item.fullName,
     value: item.id,
   }));
 }

 get improvingWayController() {
   return this.store.directory.state.improvingWay.map((item: any) => ({
     text: item.name,
     value: item.id,
   }));
 }

 get employmentController() {
   return this.store.directory.state.employment.map((item: any) => ({
     text: item.name,
     value: item.id,
   }));
 }

 get queuePriorityController() {
   return this.store.directory.state.priority.map((item: any) => ({
     text: item.name,
     value: item.id,
   }));
 }

 get stateElectronicQueueState() {
   return this.store.electronicQueue.state;
 }

 get stateElectronicQueueData() {
   return this.store.electronicQueue.state.data;
 }

 get queueQueueStatusController() {
   return this.store.directory.state.queueStatus.map((item: any) => ({
     text: item.name,
     value: item.id,
   }));
 }

 get noDataText(): string {
   const { error } = this.stateElectronicQueueState;
   return error ? error.message : 'Данные отсутствуют';
 }

 fetchControllerData() {
   const params = {};
   this.store.directory.fetchDeedStatusController();
   this.store.directory.fetchEmploymentController();
   this.store.directory.fetchIndividualPersonInfoController(params);
   this.store.directory.fetchImprovingWayController();
   this.store.directory.fetchQueuePriorityController();
   this.store.directory.fetchQueueStatusController();
 }

 fetchStateElectronicQueue() {
   const {
     store,
     page,
     size,
     sort,
     filter,
   } = this;

   const fieldsToReplace: ReplaceConditions[] = [
     { from: 'periodFrom', to: 'periodFromCode, periodToCode' },
   ];

   store.electronicQueue.fetchElectronicQueueData(
     {
       page,
       size,
       sort: getFieldsToSort(fieldsToReplace, sort),
       filter,
     }
   );
 }

 handleOptionsChange(options: Pagination): void {
   const { page, size, sort } = options;

   this.sort = sort || this.sort;
   this.size = +size;
   this.page = +page;

   this.fetchStateElectronicQueue();
 }

 handleSearch(outputFilters: OutputFilters): void {
   console.log(outputFilters, 'outputFilters');
   this.filter = {
     applicantId: null,
     groupNum: null,
     improvingWayId: null,
     employmentId: null,
     queuePriorityId: null,
     statusId: null,
   };

   outputFilters.filter(item => {
     const [itemValue]: any = item.value;
     if (item.name === 'applicantId') {
       this.filter.applicantId = itemValue?.value;
     } else if (item.name === 'improvingWayId') {
       this.filter.improvingWayId = itemValue?.value;
     } else if (item.name === 'employmentId') {
       this.filter.employmentId = itemValue?.value;
     } else if (item.name === 'queuePriorityId') {
       this.filter.queuePriorityId = itemValue?.value;
     } else if (item.name === 'statusId') {
       this.filter.statusId = itemValue?.value;
     } else if (item.name === 'groupNum') {
       this.filter.groupNum = itemValue;
     }
   });

   this.fetchStateElectronicQueue();
 }

 handleReset(): void {
   this.items = [];
   this.filter = {
     applicantId: null,
     groupNum: null,
     improvingWayId: null,
     employmentId: null,
     queuePriorityId: null,
     statusId: null,
   };
 }

 saveColumns(): void {
   const data = { columns: this.columns, sort: this.sort, items: this.items };
 }

 onConformClick() {
   this.checkedProperties = this.checkedProperties.map((item: any) => item.id);
   this.store.electronicQueue.fetchElectronicQueueArchive(this.checkedProperties);
   this.fetchStateElectronicQueue();
 }

 handleExporInXlsx() {
   // ToDo handleExportDeedInXlsx
 }
}

</script>
