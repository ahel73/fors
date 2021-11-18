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
            <select-component
              v-model="info"
              label="Способ УЖУ"
            />
            <select-component
              v-model="info.funds"
              label=" Направление расходования средств"
            />
            <select-component
              v-model="info.measure.name"
              label=" Сфера занятости"
            />
            <select-component
              v-model="info.measure.kbk"
              label="Приоритет"
            />
          </v-col>
        </v-row>
        <v-row>
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
            <input-component
              v-model="info.dateCreate"
              label="Дата создания"
            />
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
  },
})

export default class AccountingBusinessListCard extends Vue {
  isSignatureModalOpen = false;
  isPreviewPrintModalOpen = false;

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
