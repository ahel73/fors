<template>
  <div class="card">
    <v-col cols="12">
      <div class="main-header">
        <h2>Ученое дело</h2>
      </div>
    </v-col>
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
      <v-tab-item key="main">
        <v-row>
          <v-col cols="8">
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
          <v-col cols="4">
            <input-component
              v-model="info.dateCreate"
              label="Код ОКТМО"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <input-component
              v-model="info.dateCreate"
              label="Размер общей площади"
            />
          </v-col>
          <v-col cols="4">
            <input-component
              v-model="info.dateCreate"
              label="Расчетный объем средств"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата постановки на учет"
            />
          </v-col>
          <v-col cols="4">
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
          <v-col cols="8">
            <select-component label=" Период" />
            <input-component
              v-model="info.dateCreate"
              label="Дата создания"
            />
            <select-component label="Статус" />
          </v-col>
          <v-col />
        </v-row>
        <v-row>
          <v-col cols="6">
            <button-component
              @click="putOnRecord"
              size="micro"
              title="Поставить на учет"
            />

            <button-component
              @click="onDeregister"
              size="micro"
              title="Снять с учета"
            />
          </v-col>
          <v-col cols="4">
            <button-component
              @click="saveDataApplicant"
              size="micro"
              title="Сохранить"
            />
            <button-component
              @click="cancel"
              size="micro"
              title="Отменить"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item key="family">
        <v-row>
          <v-col cols="8">
            <input-component
              v-model="info.dateCreate"
              label="Фамилия Имя Отчество"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата рождения"
            />
          </v-col>
          <v-col cols="4">
            <select-component
              v-model="info.dateCreate"
              label="Родственные отношения"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <input-component
              v-model="info.dateCreate"
              label="Документ, удостоверяющий личность"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <button-component
              @click="saveDataApplicant"
              size="micro"
              title="Сохранить"
            />
            <button-component
              @click="cancel"
              size="micro"
              title="Отменить"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item key="document">
        <v-row>
          <v-col cols="8">
            <input-component
              v-model="info.dateCreate"
              label="Наименование"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <input-component
              v-model="info.dateCreate"
              label="Номер"
            />
          </v-col>
          <v-col cols="4">
            <Datepicker
              v-model="info.dateCreate"
              label="Дата"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <input-component
              v-model="info.dateCreate"
              label="Примечание"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <Datepicker
              v-model="info.dateCreate"
              label="Срок действия документа"
            />
          </v-col>
          <v-col cols="4">
            Действующий
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <input-component
              v-model="info.dateCreate"
              label="Группа"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
    <v-row>
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
          />
        </router-link>
      </v-col>
    </v-row>
  </div>
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

@Component({
  components: {
    ButtonComponent,
    DialogComponent,
    InputComponent,
    AutocompleteComponent,
    SelectComponent,
    Datepicker,
    PdfView,
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
