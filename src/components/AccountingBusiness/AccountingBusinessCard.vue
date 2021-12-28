<template>
  <main-layout :title="title">
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
              clearable
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
              clearable
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
              clearable
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
              clearable
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
              clearable
              :disabled="isShow"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="form.normativeArea"
              label="Нормативная площадь"
              :disabled="isDisabled"
            />
          </v-col>
          <v-col cols="6">
            <input-component
              v-model="form.refinedArea"
              label="Уточненная площадь"
              :disabled="isShow"
            />
          </v-col>
          <v-col>
            <autocomplete-component
              v-model="form.oktmo"
              label="ОКТМО населенного пункта для строительства/приобретения"
              :items="oktmoController"
              item-text="code"
              variant="micro"
              return-object
              required
              clearable
              :rules="[
                rules.required
              ]"
              :disabled="(isShow || statusCard !== 1) && !isAdd"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <Datepicker
              v-model="form.registrationDate "
              label="Дата постановки на учет"
              :readonly="isShow"
              :disabled="isShow"
              view-format="DD.MM.YYYY"
              output-format="YYYY-MM-DD"
            />
          </v-col>
          <v-col cols="6">
            <Datepicker
              v-model="form.changeDate "
              label="Дата изменения"
              :readonly="true"
              :disabled="true"
              view-format="DD.MM.YYYY"
              output-format="YYYY-MM-DD"
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
                class="d-flex justify-start flex-nowrap"
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
                class="d-flex justify-start flex-nowrap"
              >
                <span
                  v-if="!isShow"
                  class="table-action__wrapper"
                >
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
                <span
                  v-if="!isShow"
                  class="table-action__wrapper"
                >
                  <base-action
                    @click="handleDeleteDocument(item)"
                    hint="Удалить"
                  >
                    <delete-icon />
                  </base-action>
                </span>
                <span
                  v-if="item.fileUid"
                  class="table-action__wrapper"
                >
                  <base-action
                    @click="downloadFile(item.fileUid)"
                    hint="Скачать"
                  >
                    <download-icon />
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
          />
        </v-col>
      </template>
    </dialog-component>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import DialogComponent from '@/components/shared/Dialog/Dialog.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import PdfView from '@/components/shared/DocumentActions/PdfView/PdfView.vue';
import AutocompleteComponent from '../shared/inputs/AutocompleteComponent.vue';
import Datepicker from '../shared/Datepicker/Datepicker.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import DataTable from '../shared/table/DataTable.vue';
import DeleteIcon from '@/components/shared/IconComponent/icons/DeleteIcon.vue';
import DownloadIcon from '@/components/shared/IconComponent/icons/DownloadIcon.vue';
import EditIcon from '@/components/shared/IconComponent/icons/EditIcon.vue';
import EyeIcon from '@/components/shared/IconComponent/icons/EyeIcon.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import TextComponent from '@/components/shared/Text/Text.vue';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import ModalButton from '../shared/buttons/ModalButton.vue';
import { cloneDeep } from 'lodash';
import eventBus from '@/utils/bus/event-bus';
import moment from 'moment';
import SelectComponent from '../shared/inputs/SelectComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { DeedItemCard, DocumentItem, FamilyMembers } from '@/types/DeedType';
import { AccountingType, UndoRecordAccounting } from '@/types/AccountingType';

@Component({
  components: {
    DialogComponent,
    InputComponent,
    AutocompleteComponent,
    SelectComponent,
    Datepicker,
    MainLayout,
    PdfView,
    DataTable,
    DeleteIcon,
    EditIcon,
    DownloadIcon,
    EyeIcon,
    BaseAction,
    TextComponent,
    ModalButton,
    ButtonComponent,
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
  title = 'Учетное дело';

  isEditable = true;

  cancelDialog = false;

  tab = 0;
  docForDelete = {} as DocumentItem;
  peopleForDelete = {} as FamilyMembers;
  form = {} as DeedItemCard;

  isShow = false;
  isAdd = false;

  rules = {
    required: (value: any) => !!value || 'Обязательное поле',
  };

  headersFamily = [
    {
      text: '№ п/п',
      value: 'number',
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
    if (this.$route.params.type === 'show') {
      this.isShow = true;
    }
    if (this.store.deedItem.state.tab) {
      this.tab = this.store.deedItem.state.tab;
    }
    if (this.$route.params.type !== 'create') {
      if (Object.keys(this.store.deedItem.state.data).length === 0) {
        this.fetchById();
      } else {
        this.form = this.store.deedItem.state.data;
        this.title = 'Учетное дело ' + this.form.id;
      }
    } else {
      this.form = {} as DeedItemCard;
      if (Object.keys(this.store.deedItem.state.data).length !== 0) {
        this.form = this.store.deedItem.state.data;
      }
      this.isAdd = true;
    }
    this.fetchControllerData();
  }

  get card() {
    return this.store.deedItem.state.data;
  }

  get statusCard() {
    return this.store.deedItem.state.data.status ? this.store.deedItem.state.data.status.id : null;
  }

  @Watch('card')
  getDataForm(card: DeedItemCard) {
    this.form = cloneDeep(card);
    const params = {
      deed: false,
      listForUpdating: true,
      id: +this.form.applicant?.id,
    };
    this.store.directory.fetchIndividualPersonInfoController(params);
  }

  async fetchById() {
    await this.store.deedItem.fetchDeedControllerItem(this.$route.params.id);
    this.title = 'Учетное дело ' + this.form.id;
  }

  get formDoc() {
    return this.store.deedItem.state.data.documents;
  }

  get familyMembers() {
    return this.store.deedItem.state.data.familyMembers;
  }

  get individualPersonInfoController() {
    return this.store.directory.state.personInfo;
  }

  get improvingWayController() {
    return this.store.directory.state.improvingWay;
  }

  get employmentController() {
    return this.store.directory.state.employment;
  }

  get queuePriorityController() {
    return this.store.directory.state.priority;
  }

  get spendingDirectionController() {
    return this.store.directory.state.spendingDirection;
  }

  get oktmoController() {
    return this.store.directory.state.oktmo;
  }

  get deedStatusController() {
    return this.store.directory.state.deedStatus;
  }

  fetchControllerData() {
    const params = {
      deed: false,
      listForUpdating: true,
      id: +this.form.applicant?.id,
    };
    const code = {
      regionCode: 20,
    };
    this.store.directory.fetchIndividualPersonInfoController(params);
    this.store.directory.fetchDeedStatusController();
    this.store.directory.fetchEmploymentController();

    this.store.directory.fetchImprovingWayController();
    this.store.directory.fetchQueuePriorityController();
    this.store.directory.fetchSpendingDirectionController();
    this.store.directory.fetchOktmoControllerData(code);
  }

  handleOpenfamilyMembers(item: FamilyMembers) {
    this.store.deedItem.saveStateItem(this.form);
    this.store.deedItem.changeFamilyPeople(item);
  }

  handleOpenDocument(item: DocumentItem) {
    this.store.deedItem.saveStateItem(this.form);
    this.store.deedItem.changeDocument(item);
  }

  addNewFamilyPeople() {
    this.store.deedItem.saveStateItem(this.form);
    this.store.directory.findFamilyMembers(this.familyMembers);
    this.$router.push({ name: 'accountingBusinessFamilyCard' });
  }

  downloadFile(id: string): void {
    this.store.fileRepository.downloadFileAction(id);
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
    const data: AccountingType = {
      deedId: this.$route.params.id,
      registrationDate: this.recordDate,
    };
    await this.store.record.recordAccounting(data);
    this.fetchById();
    this.recordDate = '';
  }

  async onDeregister() {
    const data: UndoRecordAccounting = {
      deedId: this.$route.params.id,
      changeReason: this.form.changeReason,
    };
    await this.store.undoRecord.undoRecordAccounting(data);
    this.fetchById();
  }

  async saveAllInfo() {
    this.form.registrationDate = moment(this.form.registrationDate).format('YYYY-MM-DDTHH:mm:ss.SSS').toString();
    if (this.form.applicant === undefined || this.form.improvingWay === undefined || this.form.oktmo === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательные поля не заполнены',
          type: 'error',
        }
      );
    } else if (this.form.improvingWay !== undefined && this.form.improvingWay.id === 1 &&
    (this.form.spendingDirection === undefined || this.form.employment === undefined)) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Проверьте корректность заполнения полей "Направление расходования средств" и "Сфера занятости"',
          type: 'error',
        }
      );
    } else {
      if (!this.$route.params.id) {
        const data: DeedItemCard = {
          ...this.form,
          documents: this.formDoc,
          familyMembers: this.familyMembers,
        };
        await this.store.createItem.fetchCreateDeedController(data).then(() => {
          if (!this.store.createItem.state.error) {
            this.$router.replace({
              path: '/accounting-business',
            });
            this.store.deedItem.clearItem();
          }
        });
      } else {
        const data: DeedItemCard = {
          ...this.form,
          documents: this.formDoc,
          familyMembers: this.familyMembers,
          id: this.$route.params.id,
        };
        await this.store.updateItem.fetchUpdateDeedController(data).then(() => {
          if (!this.store.updateItem.state.error) {
            this.$router.replace({
              path: '/accounting-business',
            });
            this.store.deedItem.clearItem();
          }
        });
      }
    }
    this.store.deedItem.changeTabValue(0);
  }

  handleDeleteFamilyPeople(item: FamilyMembers) {
    this.peopleForDelete = item;
    this.isDeletePeopleDialogShow = true;
  }

  handleDeleteDocument(document: DocumentItem) {
    this.docForDelete = document;
    this.isDeleteDocumentDialogShow = true;
  }

  handleDeleteDocumentSuccess() {
    this.store.deedItem.deleteDocument(this.docForDelete);
    this.docForDelete = {} as DocumentItem;
  }

  handleDeletePeopleSuccess() {
    this.store.deedItem.deleteFamilyPeople(this.peopleForDelete);
    this.peopleForDelete = {} as FamilyMembers;
  }

  onCancelClick() {
    this.cancelDialog = false;
    this.store.deedItem.clearItem();
    this.store.deedItem.changeTabValue(0);
    this.$router.push({ name: 'AccountingBusiness' });
  }
}
</script>

<style scoped lang="scss">
  .card {
    padding-left: 32px;
  }

  .tab-card {
    border: 1px solid grey;
    margin-bottom: 16px;
    padding: 16px;

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
