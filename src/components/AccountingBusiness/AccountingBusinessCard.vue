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
              required
              :rules="[
                rules.required
              ]"
              :disabled="(isShow || statusCard !== 1) && !isAdd"
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
              is-required
              :rules="[
                rules.required
              ]"
              :disabled="(isShow || statusCard !== 1) && !isAdd"
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
              :disabled="(isShow || statusCard !== 1) && !isAdd"
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
              :disabled="(isShow || statusCard !== 1) && !isAdd"
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
              :disabled="isShow"
            />
          </v-col>
          <v-col cols="6">
            <autocomplete-component
              v-model="form.oktmo"
              label="Код ОКТМО"
              :items="oktmoController"
              item-text="code"
              variant="micro"
              return-object
              required
              :rules="[
                rules.required
              ]"
              :disabled="(isShow || statusCard !== 1) && !isAdd"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="form.area"
              label="Размер общей площади"
              :disabled="isDisabled"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="form.registrationDate "
              label="Дата постановки на учет"
              :readonly="isShow"
              view-format="DD.MM.YYYY HH:MM"
              output-format="YYYY-MM-DD HH:MM"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-if="statusCard === 2"
            cols="12"
          >
            <input-component
              v-model="form.changeReason"
              label="Причина изменения"
              :disabled="isShow"
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
              :disabled="isDisabled"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row class="tab-card__button">
          <v-col
            v-if="!isShow"
            cols="auto"
          >
            <button-component
              v-if="statusCard === 1"
              @click="putOnRecord"
              size="micro"
              title="Поставить на учет"
              class="button"
            />
            <button-component
              v-if="statusCard === 2"
              @click="onDeregister"
              size="micro"
              title="Снять с учета"
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
            :items="familyMembers"
            :hide-footer="isEditable"
          >
            <template #[`item.actions`]="{ item }">
              <div
                v-if="!isShow"
                class="d-flex justify-center flex-nowrap"
              >
                <span class="table-action__wrapper">
                  <router-link
                    :to="{
                      name: 'editFamilyCard',
                    }"
                  >
                    <base-action
                      @click="handleOpenfamilyMembers(item)"
                      hint="Редактировать"
                    >
                      <edit-icon />
                    </base-action>
                  </router-link>
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
          <v-col
            v-if="!isShow"
            cols="12"
          >
            <button-component
              @click="addNewFamilyPeople"
              variant="primary"
              title="Добавить члена семьи"
              size="micro"
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
            :items="formDoc"
            :hide-footer="isEditable"
          >
            <template #[`item.actions`]="{ item }">
              <div
                v-if="!isShow"
                class="d-flex justify-center flex-nowrap"
              >
                <span class="table-action__wrapper">
                  <router-link
                    :to="{
                      name: 'editDocument',
                    }"
                  >
                    <base-action
                      @click="handleOpenDocument(item)"
                      hint="Редактировать"
                    >
                      <edit-icon />
                    </base-action>
                  </router-link>
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
        <v-col
          v-if="!isShow"
          cols="12"
        >
          <button-component
            @click="addNewDocument"
            variant="primary"
            title="Добавить документ"
            size="micro"
          />
        </v-col>
      </v-tab-item>
    </v-tabs-items>
    <v-row class="tab-card__button-end">
      <v-col
        v-if="!isShow"
        cols="auto"
      >
        <button-component
          @click="saveAllInfo"
          size="micro"
          title="Сохранить"
          variant="primary"
        />
      </v-col>
      <v-col
        v-if="isShow"
        cols="auto"
      >
        <button-component
          @click="onCancelClick"
          size="micro"
          title="Закрыть"
        />
      </v-col>
      <v-col
        v-if="!isShow"
        cols="auto"
      >
        <modal-button
          @onResumeClick="onCancelClick"
          button-text="Закрыть"
          modal-text="Все изменения будут потеряны?"
          cancel-button-text="Нет"
          resume-button-text="Да"
          width="450"
        />
      </v-col>
    </v-row>
    <dialog-component
      v-model="isDeleteDocumentDialogShow"
      @onSuccess="handleDeleteDocumentSuccess"
      cancel-title="Отменить"
      confirm-title="Продолжить"
      width="400"
      prompt
    >
      <template #title>
        <text-component variant="h4">
          Запись будет удалена. Вы уверены?
        </text-component>
      </template>
    </dialog-component>
    <dialog-component
      v-model="isDeletePeopleDialogShow"
      @onSuccess="handleDeletePeopleSuccess"
      cancel-title="Отменить"
      confirm-title="Продолжить"
      width="400"
      prompt
    >
      <template #title>
        <text-component variant="h4">
          Запись будет удалена. Вы уверены?
        </text-component>
      </template>
    </dialog-component>
    <dialog-component
      v-model="isOnRecordDialogShow"
      @onSuccess="handleRecordSuccess"
      cancel-title="Отменить"
      confirm-title="Продолжить"
      width="400"
      prompt
    >
      <template #title>
        <text-component variant="h4">
          Поставить на учет учетное дело №{{ form.id }}
        </text-component>
        <v-col>
          <Datepicker
            v-model="recordDate"
            class="datePicker"
            :format="'DD.MM.YYYY'"
            label="Дата постановки на учет"
            title-format="MMMM YYYY"
          />
        </v-col>
      </template>
    </dialog-component>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

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
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import { updateDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import ModalButton from '../shared/buttons/ModalButton.vue';
import { cloneDeep } from 'lodash';
import eventBus from '@/utils/bus/event-bus';

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
    ModalButton,
  },
})

export default class AccountingBusinessListCard extends Vue {
  store: Store = useStore(this.$store);
  isDeleteDocumentDialogShow = false;
  isDeletePeopleDialogShow = false;
  isOnRecordDialogShow = false;
  familyPeople = {};
  documentEditOrCreate = {};
  peopleId = '';
  editDocument: number | string = '';
  indexPeople: number | string = '';
  isDisabled = true;
  recordDate = '';

  isEditable = true;

  cancelDialog = false;

  tab = '';
  docForDelete = {};
  peopleForDelete = {};
  form = {
    changeReason: '',
  };

  isShow = false;
  isAdd = false;

  rules = {
    required: (value: any) => !!value || 'Обязательное поле',
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

  async created() {
    this.fetchControllerData();
    if (this.$route.params.type === 'show') {
      this.isShow = true;
    }
    if (this.$route.params.type !== 'create') {
      if (Object.keys(this.store.deedItem.state.data).length === 0) {
        this.fetchById();
      } else {
        this.form = this.store.deedItem.state.data;
      }
    } else {
      this.form = {
        changeReason: '',
      };
      if (Object.keys(this.store.deedItem.state.data).length !== 0) {
        this.form = this.store.deedItem.state.data;
      }
      this.isAdd = true;
    }
  }

  get card() {
    return this.store.deedItem.state.data;
  }

  get statusCard() {
    return this.store.deedItem.state.data.status ? this.store.deedItem.state.data.status.id : null;
  }

  @Watch('card')
  getDataForm(card: any) {
    this.form = cloneDeep(card);
  }

  async fetchById() {
    await this.store.deedItem.fetchDeedControllerItem(this.$route.params.id);
  }

  get formDoc() {
    return this.store.deedItem.state.data.documents;
  }

  get familyMembers() {
    return this.store.deedItem.state.data.familyMembers;
  }

  get individualPersonInfoController() {
    return this.store.personInfo.state.data;
  }

  get improvingWayController() {
    return this.store.improvingWay.state.data;
  }

  get employmentController() {
    return this.store.employment.state.data;
  }

  get queuePriorityController() {
    return this.store.priority.state.data;
  }

  get spendingDirectionController() {
    return this.store.spendingDirection.state.data;
  }

  get oktmoController() {
    return this.store.oktmo.state.data;
  }

  get deedStatusController() {
    return this.store.status.state.data;
  }

  fetchControllerData() {
    this.store.status.fetchDeedStatusController();
    this.store.personInfo.fetchIndividualPersonInfoController();
    this.store.improvingWay.fetchImprovingWayController();
    this.store.employment.fetchEmploymentController();
    this.store.priority.fetchQueuePriorityController();
    this.store.spendingDirection.fetchSpendingDirectionController();
    this.store.oktmo.fetchOktmoControllerData();
  }

  handleOpenfamilyMembers(item: any) {
    this.store.deedItem.saveStateItem(this.form);
    this.store.deedItem.changeFamilyPeople(item);
  }

  handleOpenDocument(item: any) {
    this.store.deedItem.saveStateItem(this.form);
    this.store.deedItem.changeDocument(item);
  }

  addNewFamilyPeople() {
    this.store.deedItem.saveStateItem(this.form);
    this.$router.push({ name: 'accountingBusinessFamilyCard' });
  }

  addNewDocument() {
    this.store.deedItem.saveStateItem(this.form);
    this.$router.push({ name: 'accountingBusinessDocumentCard' });
  }

  putOnRecord() {
    this.isOnRecordDialogShow = true;
    this.recordDate = '';
  }

  async handleRecordSuccess() {
    const data = {
      deedId: this.$route.params.id,
      registrationDate: this.recordDate,
    };
    await this.store.record.fetchRecordAccounting(data);
    this.fetchById();
    this.recordDate = '';
  }

  async onDeregister() {
    const data = {
      deedId: this.$route.params.id,
      changeReason: this.form.changeReason,
    };
    await this.store.undoRecord.fetchUndoRecordAccounting(data);
    this.fetchById();
  }

  async saveAllInfo() {
    if (this.form.applicant === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательное поле "Заявитель" не заполненно',
          type: 'error',
        }
      );
    } else if (this.form.improvingWay === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательное поле "Способ УЖУ" не заполненно',
          type: 'error',
        }
      );
    } else if (this.form.oktmo === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательное поле "Способ УЖУ" не заполненно',
          type: 'error',
        }
      );
    } else {
      if (!this.$route.params.id) {
        const data = {
          ...this.form,
          documents: this.formDoc,
          familyMembers: this.familyMembers,
        };
        await this.store.createItem.fetchCreateDeedController(data);
        this.$router.replace({
          path: '/accountingBusiness',
        });
      } else {
        updateDeedController(this.$route.params.id, this.form);
        this.$router.replace({
          path: '/accountingBusiness',
        });
      }
      this.store.deedItem.clearItem();
    }
  }

  handleDeleteFamilyPeople(item: string) {
    this.peopleForDelete = item;
    this.isDeletePeopleDialogShow = true;
  }

  handleDeleteDocument(document: string) {
    this.docForDelete = document;
    this.isDeleteDocumentDialogShow = true;
  }

  handleDeleteDocumentSuccess() {
    this.store.deedItem.deleteDocument(this.docForDelete);
    this.docForDelete = {};
  }

  handleDeletePeopleSuccess() {
    this.store.deedItem.deleteFamilyPeople(this.peopleForDelete);
    this.peopleForDelete = {};
  }

  onCancelClick() {
    this.cancelDialog = false;
    this.store.deedItem.clearItem();
    this.$router.push({ name: 'AccountingBusiness' });
  }

  @Watch('form.improvingWay')
  checkRequiredField(improvingWay: string) {
    if (improvingWay.id === '1') {
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-left: 32px;
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
