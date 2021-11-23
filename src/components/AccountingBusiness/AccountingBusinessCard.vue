<template>
  <main-layout title="Учетное дело">
    <v-tabs
      v-model="tab"
      background-color="white"
    >
      <v-tab key="main">
        Данные заявителя
      </v-tab>
      <v-tab key="family">
        Члены семьи
      </v-tab>
      <v-tab key="document">
        Документы
      </v-tab>
      <!-- <v-tab key="his"> Использование </v-tab> -->
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        class="tab-card"
        key="main"
      >
        <v-row>
          <v-col cols="12">
            <autocomplete-component
              v-model="info.name"
              label="Заявитель"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="info"
              label="Способ УЖУ"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="info.funds"
              label=" Направление расходования средств"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="info.measure.name"
              label=" Сфера занятости"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="info.measure.kbk"
              label="Приоритет"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="info.dateCreate"
              label="Код ОКТМО"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <input-component
              v-model="info.dateCreate"
              label="Размер общей площади"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="info.dateCreate"
              label="Расчетный объем средств"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата постановки на учет"
            />
          </v-col>
          <v-col cols="6">
            <Datepicker
              v-model="info.dateChange"
              class="datePicker"
              :format="'DD.MM.YYYY'"
              label="Дата изменения"
              title-format="MMMM YYYY"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <select-component label=" Период" />
          </v-col>
          <v-col cols="12">
            <input-component
              v-model="info.dateCreate"
              label="Дата создания"
            />
          </v-col>
          <v-col cols="12">
            <select-component label="Статус" />
          </v-col>
          <v-col />
        </v-row>
        <v-row class="tab-card__button">
          <v-col cols="auto">
            <button-component
              @click="putOnRecord"
              size="micro"
              title="Поставить на учет"
              class="button"
            />
            <button-component
              @click="onDeregister"
              size="micro"
              title="Снять с учета"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="saveDataApplicant"
              size="micro"
              title="Сохранить"
              class="button"
            />
            <button-component
              @click="cancel"
              size="micro"
              title="Отменить"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item
        class="tab-card"
        key="family"
      >
        <v-col>
          <data-table
            :headers="headersFamily"
            :items="form.familyMembers"
            hide-footer="true"
          >
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
                    @click="handleDelete()"
                    hint="Удалить"
                  >
                    <delete-icon />
                  </base-action>
                </span>
              </div>
            </template>
          </data-table>
        </v-col>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="info.dateCreate"
              label="Фамилия Имя Отчество"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата рождения"
            />
          </v-col>
          <v-col cols="6">
            <select-component
              v-model="info.dateCreate"
              label="Родственные отношения"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="info.dateCreate"
              label="Документ, удостоверяющий личность"
            />
          </v-col>
        </v-row>
        <v-row class="tab-card__button-end">
          <v-col cols="auto">
            <button-component
              @click="saveDataApplicant"
              size="micro"
              title="Сохранить"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="cancel"
              size="micro"
              title="Отменить"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item
        class="tab-card"
        key="document"
      >
        <v-col>
          <data-table
            :headers="headers"
            :items="form.documents"
            hide-footer="true"
          >
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
                    @click="handleDeleteUD(item.id)"
                    hint="Удалить"
                  >
                    <delete-icon />
                  </base-action>
                </span>
              </div>
            </template>
          </data-table>
        </v-col>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="info.dateCreate"
              label="Наименование"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <input-component
              v-model="info.dateCreate"
              label="Номер"
            />
          </v-col>
          <v-col cols="6">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="info.dateCreate"
              label="Примечание"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="info.dateCreate"
              label="Срок действия документа"
            />
          </v-col>
          <v-col cols="6">
            <checkbox-component
              v-model="info.acting"
              class="card__item"
              label="Действующий"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <select-component
              v-model="info.gruppa"
              label="Группа"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <upload-file-component
              v-model="info.file"
              label="Файл"
              placeholder="Загрузить"
              prepend-icon="mdi-arrow-collapse-down"
            />
          </v-col>
        </v-row>
        <v-row class="tab-card__button-end">
          <v-col cols="auto">
            <button-component
              @click="saveDataApplicant"
              size="micro"
              title="Сохранить"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="cancel"
              size="micro"
              title="Отменить"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
    <v-row class="tab-card__button-end">
      <v-col cols="auto">
        <button-component
          @click="saveAllInfo"
          size="micro"
          title="Сохранить"
          variant="primary"
        />
      </v-col>
      <v-col cols="auto">
        <router-link to="/accountingBusiness">
          <button-component
            @click="cancel"
            size="micro"
            title="Отменить"
            class="button-save"
          />
        </router-link>
      </v-col>
    </v-row>
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
import DialogComponent from '@/components/shared/Dialog/Dialog.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import PdfView from '@/components/shared/DocumentActions/PdfView/PdfView.vue';
import AutocompleteComponent from '../shared/inputs/AutocompleteComponent.vue';
import SelectComponent from '../shared/inputs/SelectComponent.vue';
import Datepicker from '../shared/Datepicker/Datepicker.vue';
import CheckboxComponent from '../shared/inputs/CheckboxComponent.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import UploadFileComponent from '../shared/inputs/UploadFileComponent.vue';
import DataTable from '../shared/table/DataTable.vue';
import DeleteIcon from '@/components/shared/IconComponent/icons/DeleteIcon.vue';
import EditIcon from '@/components/shared/IconComponent/icons/EditIcon.vue';
import EyeIcon from '@/components/shared/IconComponent/icons/EyeIcon.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

@Component({
  components: {
    ButtonComponent,
    DialogComponent,
    InputComponent,
    AutocompleteComponent,
    SelectComponent,
    Datepicker,
    CheckboxComponent,
    MainLayout,
    PdfView,
    UploadFileComponent,
    DataTable,
    DeleteIcon,
    EditIcon,
    EyeIcon,
    BaseAction,
    TextComponent,
  },
})

export default class AccountingBusinessListCard extends Vue {
  isSignatureModalOpen = false;
  isPreviewPrintModalOpen = false;
  isDeleteMeasureDialogShow = false;

  tab = '';
  info = {
    dateCreate: null,
    dateEdit: null,
    docType: {},
    id: null,
    measure: {},
    propertyBudgetPeriodValues: [],
    quota: {
      currentFinYearId: 0,
    },
    recipient: {
      region: {},
    },
    status: {},
    subsidy: {},
  };

  form = {
    id: 10,
    regDate: '2011-11-11',
    area: 33,
    applicantId: 1,
    improvingWay: {
      id: 1,
      code: '1  ',
      name: 'социальная выплата',
    },
    employment: {
      id: 1,
      code: '1',
      name: 'АПК/Ветеринария',
    },
    queuePriority: {
      id: 1,
      code: '1',
      name: 'Многодетная семья',
    },
    familyMembers: [
      {
        id: 5,
        individualPersonId: 9,
        fullName: 'Nest Test',
        deedId: 10,
        relationship: 'брат-3',
        changeUser: null,
        createUser: null,
        changeDate: '2021-11-22T17:00:19.10433',
        createDate: '2021-11-22T16:59:17.515844',
        identityDoc: {
          id: 3,
          seriesNum: '2345532',
          issueDate: '2010-12-10',
          authority: 'some_authority',
          typeId: 2,
          typeName: 'свидетельство о рождении',
        },
        individualPerson: {
          id: 9,
          surname: 'testSurname3',
          name: 'testName3',
          fullName: 'testSurname3 testName3',
          patronymic: 'testPatronymi21',
          birthDate: '2010-11-11',
        },
      },
    ],
    documents: [
      {
        id: 8,
        deedId: 10,
        estateObjectId: null,
        name: 'Название2',
        docNum: '1212',
        docDate: '2011-11-11',
        note: 'note',
        docEndDate: '2011-11-12',
        docGroup: {
          id: 1,
          name: 'Постановка на учет',
        },
        createDate: '2021-11-22T16:49:59.348881',
        changeDate: '2021-11-22T17:00:19.157283',
        createUser: null,
        changeUser: null,
      },
    ],
    spendingDirection: {
      id: 1,
      code: '1',
      name: 'строительство',
    },
    oktmo: {
      id: 1,
      code: '1',
      name: '1',
      areaName: '1',
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
    createDate: '2021-11-22T16:49:59.124129',
    createUser: null,
    changeUser: null,
    changeDate: '2021-11-22T17:00:18.942053',
    changeReason: null,
    lkSubId: 1,
    status: {
      id: 1,
      name: 'Черновик',
    },
  };

  headersFamily = [
    {
      text: '№ п/п',
      value: 'improving_zu',
    },
    {
      text: 'Фамилия Имя Отчество',
      value: 'individualPerson.fullName',
    },
    {
      text: 'Дата рождения',
      value: 'individualPerson.birthDate',
    },
    {
      text: 'Родственные отношения',
      value: 'relationship',
    },
    {
      text: 'Документ удостоверяющий личность',
      value: 'identityDoc.typeName',
    },
    {
      text: 'Действия',
      value: 'actions',
    },
  ];

   headers = [
     {
       text: 'Номер',
       value: 'docNum',
     },
     {
       text: 'Наименование',
       value: 'name',
     },
     {
       text: 'Дата',
       value: 'docDate',
     },
     {
       text: 'Срок действия документа',
       value: 'docEndDate',
     },
     {
       text: 'Группа',
       value: 'docGroup.name',
     },
     {
       text: 'Примечание',
       value: 'note',
     },
     {
       text: 'Действия',
       value: 'actions',
     },
   ];

   putOnRecord() {
     console.log('goToConclusionsRegistry/*  */');
   }

   onDeregister() {
     console.log('goToConclusionsRegistry/*  */');
   }

   saveDataApplicant() {
     console.log('goToConclusionsRegistry/*  */');
   }

   saveAllInfo() {
     console.log('goToConclusionsRegistry/*  */');
   }

   cancel() {
     console.log('goToConclusionsRegistry/*  */');
   }

   handleDeleteUD(measureDeleteId: number) {
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
}
</script>

<style scoped lang="scss">
  .card {
    padding-left: 32px;
  }

  .card__item {
    padding-top: 32px !important;
  }

  .tab-card {
    border: 1px solid grey;
    padding: 16px;
    margin-bottom: 16px;

  .tab-card__button {
    display: flex;
    justify-content: space-between;
  }
  }

  .button {
    margin-right: 24px;
  }

  .button-save {
    margin-right: 16px;
  }

  .tab-card__button-end {
    display: flex;
    justify-content: flex-end;
  }

  .bordered {
    border-bottom: 1px solid black;
    border-top: 1px solid black;

    div {
      border: 1px solid black;
      border-collapse: collapse;
      margin: 0;

      &.row {
        border-bottom: 0;
        border-top: 0;
      }
    }
  }
</style>
