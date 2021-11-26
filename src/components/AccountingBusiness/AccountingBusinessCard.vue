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
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        class="tab-card"
        key="main"
      >
        <v-row>
          <v-col cols="12">
            <autocomplete-component
              v-model="form.applicant"
              :items="individualPersonInfoController"
              label="Заявитель"
              item-text="fullName"
              return-object
              variant="micro"
              :select-menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="form.improvingWay"
              label="Способ УЖУ"
              :items="improvingWayController"
              item-text="name"
              item-value="id"
              return-object
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="form.spendingDirection"
              label=" Направление расходования средств"
              :items="spendingDirectionController"
              item-text="name"
              item-value="id"
              return-object
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="form.employment"
              :items="employmentController"
              item-text="name"
              item-value="id"
              return-object
              label=" Сфера занятости"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="form.queuePriority"
              label="Приоритет"
              :items="queuePriorityController"
              item-text="name"
              item-value="id"
              return-object
            />
          </v-col>
          <v-col cols="6">
            <select-component
              v-model="form.oktmo"
              label="Код ОКТМО"
              :items="oktmoController"
              item-text="name"
              item-value="id"
              return-object
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <input-component
              v-model="form.area"
              label="Размер общей площади"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="form.amount_funds"
              label="Расчетный объем средств"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="form.regDate"
              label="Дата постановки на учет"
            />
          </v-col>
          <v-col cols="6">
            <Datepicker
              v-model="form.dateChange"
              class="datePicker"
              :format="'DD.MM.YYYY'"
              label="Дата изменения"
              title-format="MMMM YYYY"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="form.dateCreate"
              label="Причина изменения"
            />
          </v-col>
          <v-col cols="12">
            <select-component
              v-model="form.status"
              label="Статус"
              :items="deedStatusController"
              item-text="name"
              item-value="id"
              return-object
            />
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
            :hide-footer="isEditable"
          >
            <template #[`item.actions`]="{ item }">
              <div class="d-flex justify-center flex-nowrap">
                <span class="table-action__wrapper">
                  <base-action
                    @click="handleOpenfamilyMembers(item)"
                    hint="Редактировать"
                  >
                    <edit-icon />
                  </base-action>
                </span>
                <span class="table-action__wrapper">
                  <base-action
                    @click="handleDeleteFamilyPeople(item)"
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
            <autocomplete-component
              v-model="familyPeople.individualPerson"
              :items="individualPersonInfoController"
              label="Заявитель"
              item-text="fullName"
              return-object
              variant="micro"
              :select-menu-props="{ offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="familyPeople.birthDate"
              label="Дата рождения"
              :disabled="isEditable"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="familyPeople.relationship"
              label="Родственные отношения"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="familyPeople.identityDoc"
              label="Документ, удостоверяющий личность"
              :disabled="isEditable"
            />
          </v-col>
        </v-row>
        <v-row class="tab-card__button-end">
          <v-col cols="auto">
            <button-component
              @click="saveDataFamilyPeople"
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
            :hide-footer="isEditable"
          >
            <template #[`item.actions`]="{ item }">
              <div class="d-flex justify-center flex-nowrap">
                <span class="table-action__wrapper">
                  <base-action
                    @click="handleOpenDocument(item)"
                    hint="Редактировать"
                  >
                    <edit-icon />
                  </base-action>
                </span>
                <span class="table-action__wrapper">
                  <base-action
                    @click="handleDeleteDocument(item)"
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
              v-model="documentEditOrCreate.name"
              label="Наименование"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <input-component
              v-model="documentEditOrCreate.docNum"
              label="Номер"
            />
          </v-col>
          <v-col cols="6">
            <Datepicker
              v-model="documentEditOrCreate.docDate"
              label="Дата"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <input-component
              v-model="documentEditOrCreate.note"
              label="Примечание"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="documentEditOrCreate.docEndDate"
              label="Срок действия документа"
            />
          </v-col>
          <v-col cols="6">
            <checkbox-component
              v-model="documentEditOrCreate.acting"
              class="card__item"
              label="Действующий"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <select-component
              v-model="documentEditOrCreate.docGroup"
              :items="docGroupController"
              item-text="name"
              item-value="id"
              return-object
              label="Группа"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <upload-file-component
              v-model="documentEditOrCreate.file"
              label="Файл"
              placeholder="Загрузить"
              prepend-icon="mdi-arrow-collapse-down"
            />
          </v-col>
        </v-row>
        <v-row class="tab-card__button-end">
          <v-col cols="auto">
            <button-component
              @click="saveDocument"
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
      @onSuccess="handleDeletePeopleOrDocumentSuccess"
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
import {
  createDeedController,
  getDeedControllerByID,
  getDeedStatusController,
  getDocGroupController,
  getEmploymentController,
  getImprovingWayController,
  getIndividualPersonInfoController,
  getOktmoController,
  getQueuePriorityController,
  getSpendingDirectionController,
  updateDeedController,
} from '@/data/services/accountingBisiness/accountingBisiness';

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
  docGroupController = [];
  employmentController = [];
  improvingWayController = [];
  queuePriorityController = [];
  spendingDirectionController = [];
  deedStatusController = [];
  individualPersonInfoController = [];
  oktmoController = [];
  familyPeople = {};
  documentEditOrCreate = {};
  peopleId = '';
  documentId: number | string = '';
  editDocument: number | string = '';
  indexPeople: number | string = '';
  itemPeople: any | object = {
    changeDate: '',
    changeUser: '',
    createDate: '',
    createUser: '',
    deedId: '',
    id: '',
    identityDoc: '',
    individualPerson: '',
    birthDate: '',
    fullName: '',
    idPerson: '',
    relationship: '',
  };

  isEditable = true;

  tab = '';
  info = {};
  form = {
    familyMembers: [{}],
    documents: [{}],
  };

  headersFamily = [
    {
      text: '№ п/п',
      value: 'improving_zu',
    },
    {
      text: 'Фамилия Имя Отчество',
      value: 'personInfo.fullName',
    },
    {
      text: 'Дата рождения',
      value: 'personInfo.birthDate',
    },
    {
      text: 'Родственные отношения',
      value: 'relationship',
    },
    {
      text: 'Документ удостоверяющий личность',
      value: 'personInfo.identityDoc.typeName',
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

  mounted() {
    this.getControllerData();
    if (this.$route.params.id) {
      this.getDeedControllerByID(this.$route.params.id);
    }
  }

  getDeedControllerByID(id: any) {
    getDeedControllerByID(id).then((data) => {
      this.form = data;
    });
  }

  getControllerData() {
    getDocGroupController().then((data) => {
      this.docGroupController = data.data;
    });

    getEmploymentController().then((data) => {
      this.employmentController = data.data;
    });

    getImprovingWayController().then((data) => {
      this.improvingWayController = data.data;
    });

    getQueuePriorityController().then((data) => {
      this.queuePriorityController = data.data;
    });

    getSpendingDirectionController().then((data) => {
      this.spendingDirectionController = data.data;
    });

    getOktmoController().then((data) => {
      this.oktmoController = data.data;
    });

    getDeedStatusController().then((data) => {
      this.deedStatusController = data.data;
    });

    getIndividualPersonInfoController().then((data) => {
      this.individualPersonInfoController = data.data;
    });
  }

  handleOpenfamilyMembers(item: any) {
    this.indexPeople = this.form.familyMembers.indexOf(item);
    console.log(this.indexPeople, item, 'this.indexPeople');

    this.familyPeople = {
      changeDate: item.changeDate ? item.changeDate : null,
      changeUser: item.changeUser ? item.changeUser : null,
      createDate: item.createDate ? item.createDate : null,
      createUser: item.createUser ? item.createUser : null,
      deedId: item.deedId ? item.deedId : null,
      id: item.id ? item.id : null,
      identityDoc: item.personInfo.identityDoc ? item.personInfo.identityDoc.typeName : null,
      individualPerson: item.personInfo ? item.personInfo : null,
      birthDate: item.personInfo.birthDate ? item.personInfo.birthDate : null,
      fullName: item.personInfo.fullName ? item.personInfo.fullName : null,
      idPerson: item.personInfo.id ? item.personInfo.id : null,
      relationship: item.relationship ? item.relationship : null,
    };
  }

  handleOpenDocument(item: any) {
    this.editDocument = this.form.documents.indexOf(item);
    this.documentEditOrCreate = item;
    console.log(this.form.documents.indexOf(item), 'item');
  }

  saveDataFamilyPeople() {
    this.itemPeople = this.familyPeople;

    const people = {
      changeDate: '2021-11-25T23:47:09.453252',
      changeUser: this.itemPeople.changeUser ? this.itemPeople.changeUser : null,
      createDate: '2021-11-25T23:47:09.453252',
      createUser: this.itemPeople.createUser ? this.itemPeople.createUser : null,
      deedId: this.$route.params.id,
      id: this.itemPeople.id ? this.itemPeople.id : null,
      identityDoc: {
        typeName: this.itemPeople.identityDoc ? this.itemPeople.identityDoc : null,
      },
      personInfo: this.itemPeople.individualPerson ? this.itemPeople.individualPerson : null,
      relationship: this.itemPeople.relationship ? this.itemPeople.relationship : null,
    };

    console.log(people, 'ppp');

    if (this.indexPeople === 0 || this.indexPeople) {
      this.form.familyMembers[+this.indexPeople] = people;
      console.log(this.form.familyMembers, 'this.form.familyMembers');
    } else {
      this.form.familyMembers.push(people);
    }
    this.familyPeople = {};
    this.indexPeople = '';
  }

  saveDocument() {
    if (this.editDocument === 0 || this.editDocument) {
      this.form.documents[+this.editDocument] = this.documentEditOrCreate;
    } else {
      this.form.documents.push(this.documentEditOrCreate);
    }
    this.editDocument = '';
    this.documentEditOrCreate = {};
  }

  putOnRecord() {
    console.log('putOnRecord');
  }

  onDeregister() {
    console.log('onDeregister');
  }

  saveDataApplicant() {
    console.log('saveDataApplicant');
  }

  saveAllInfo() {
    if (!this.$route.params.id) {
      createDeedController(this.form);
      this.$router.replace({
        path: '/accountingBusiness',
      });
    } else {
      updateDeedController(this.$route.params.id, this.form);
      this.$router.replace({
        path: '/accountingBusiness',
      });
    }
  }

  cancel() {
    this.familyPeople = {};
    this.documentEditOrCreate = {};
    console.log('cancel');
  }

  handleDeleteFamilyPeople(item: string) {
    this.indexPeople = this.form.familyMembers.indexOf(item);
    this.isDeleteMeasureDialogShow = true;
  }

  handleDeleteDocument(document: string) {
    this.documentId = this.form.documents.indexOf(document);
    this.isDeleteMeasureDialogShow = true;
  }

  handleDeletePeopleOrDocumentSuccess() {
    if (this.indexPeople === 0 || this.indexPeople) {
      this.form.familyMembers.splice(+this.indexPeople, 1);
      this.indexPeople = '';
    } else if (this.editDocument === 0 || this.editDocument) {
      this.form.documents.splice(+this.documentId, 1);
      this.documentId = '';
    }
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
