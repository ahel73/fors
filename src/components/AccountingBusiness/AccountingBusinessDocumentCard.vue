<template>
  <main-layout title="Документ">
    <v-row>
      <v-col>
        <input-component
          v-model="documentEditOrCreate.name"
          label="Наименование"
          required
          :rules="[rules.required]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <input-component
          v-model="documentEditOrCreate.docNum"
          label="Номер"
          required
          :rules="[rules.required]"
        />
      </v-col>
      <v-col cols="6">
        <Datepicker
          v-model="documentEditOrCreate.docDate"
          label="Дата"
          is-required
          :rules="[rules.required]"
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
          v-model="documentEditOrCreate.active"
          class="card__item"
          label="Актуальный"
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
          clearable
          label="Группа"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <upload-file-component
          @onChange="(file) => uploadFile(file)"
          @downloadFile="downloadFile(documentEditOrCreate.fileUid)"
          @deleteFile="(id) => deleteFile(documentEditOrCreate.fileUid)"
          label="Файл"
          :files-list="documentEditOrCreate.fileName"
          prepend-icon="mdi-arrow-collapse-down"
        />
      </v-col>
    </v-row>
    <v-row class="tab-card__button-end">
      <v-col cols="auto">
        <button-component
          @click="saveDocument"
          size="micro"
          title="Ок"
        />
      </v-col>
      <v-col cols="auto">
        <modal-button
          @onResumeClick="onCancelClick"
          button-text="Отменить"
          modal-text="Все изменения будут потеряны?"
          cancel-button-text="Нет"
          resume-button-text="Да"
          width="450"
        />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from '@/layouts/MainLayout.vue';
import AutocompleteComponent from '../shared/inputs/AutocompleteComponent.vue';
import Datepicker from '../shared/Datepicker/Datepicker.vue';
import InputComponent from '../shared/inputs/InputComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import CheckboxComponent from '../shared/inputs/CheckboxComponent.vue';
import SelectComponent from '../shared/inputs/SelectComponent.vue';
import UploadFileComponent from '../shared/inputs/UploadFileComponent.vue';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import ModalButton from '../shared/buttons/ModalButton.vue';
import eventBus from '@/utils/bus/event-bus';
import { FileRepositoryResponse } from '@/types/byServices/fileRepository/fileRepository';
import { MultipleFileResponseData } from '@/data/services/fileRepository/types';
import { AxiosError } from 'axios';
import { DocumentItem } from '@/types/DeedType';

interface File {
  fileName: string,
  id: string,
}

@Component({
  name: 'accountingBusinessDocumentCard',
  components: {
    MainLayout,
    AutocompleteComponent,
    Datepicker,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    SelectComponent,
    UploadFileComponent,
    ModalButton,
  },
})
export default class AccountingBusinessDocumentCard extends Vue {
  store: Store = useStore(this.$store);
  documentEditOrCreate = {
    active: false,
  } as DocumentItem;

  rules = {
    required: (value: any) => !!value || 'Обязательное поле',
  };

  mounted() {
    this.getControllerData();
    if (this.$route.name === 'editDocument') {
      this.fetchDocument();
    }
  }

  get itemDocument() {
    return this.store.deedItem.state.documentEdit;
  }

  fetchDocument() {
    this.documentEditOrCreate = this.itemDocument;
  }

  fileRepositoryData(): FileRepositoryResponse | MultipleFileResponseData | null {
    return this.store.fileRepository.state.data;
  }

  fileRepositoryEror(): AxiosError | null {
    return this.store.fileRepository.state.error;
  }

  get docGroupController() {
    return this.store.directory.state.deedDocGroup;
  }

  getControllerData() {
    this.store.directory.fetchDocGroupController();
  }

  async uploadFile(file: any): Promise<void> {
    if (file) {
      await this.store.fileRepository.uploadFileAction({ file });
    }
  }

  downloadFile(id: string): void {
    this.store.fileRepository.downloadFileAction(id);
  }

  async deleteFile(id: string): Promise<void> {
    await this.store.fileRepository.deleteFileAction(id);
    this.documentEditOrCreate.fileName = '';
    this.documentEditOrCreate.fileUid = '';
  }

  saveDocument() {
    if (this.documentEditOrCreate.name === undefined || this.documentEditOrCreate?.docNum === undefined ||
    this.documentEditOrCreate.docDate === undefined) {
      eventBus.$emit('notification:message', {
        text: 'Обязательные поля не заполнены',
        type: 'error',
      });
    } else {
      const dataFile = this.store.fileRepository.state.data;
      if (dataFile) {
        const file: any = dataFile;
        this.documentEditOrCreate.fileName = file?.fileName;
        this.documentEditOrCreate.fileUid = file?.id;
        this.store.fileRepository.clearStoreFile();
      }
      if (this.documentEditOrCreate.index || this.documentEditOrCreate.id) {
        this.store.deedItem.updateDocument(this.documentEditOrCreate);
      } else {
        this.documentEditOrCreate.index = Math.floor(
          Math.random() * 10000
        ).toString();
        this.store.deedItem.addDocument(this.documentEditOrCreate);
      }
      this.store.deedItem.changeTabValue(2);
      this.$router.go(-1);
      this.documentEditOrCreate = {} as DocumentItem;
    }
  }

  onCancelClick() {
    this.store.deedItem.changeTabValue(2);
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
.card__item {
  padding-top: 32px !important;
}

.tab-card__button-end {
  display: flex;
  justify-content: flex-end;
}
</style>
