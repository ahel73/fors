<template>
  <main-layout title="Документ">
    <v-row>
      <v-col cols="12">
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
          label="Группа"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <upload-file-component
          @onChange="(file) => uploadFile(file, '')"
          @downloadFile="downloadFile"
          @deleteFile="(id) => deleteFile(id, '')"
          label="Файл"
          :files-list="documentEditOrCreate.file"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
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
    index: '',
    id: null,
    active: false,
  };

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

  get docGroupController() {
    return this.store.docController.state.data;
  }

  getControllerData() {
    this.store.docController.fetchDocGroupController();
  }

  uploadFile(files: File[], field: 'file'): void {
    console.log(files, 'files');
    if (files.length > 0) {
      const [file] = files;
      this.store.fileRepository.uploadFileAction({ file });
      /* .then(() => {
            if (!this.fileRepositoryEror) {
              const { fileName, id } = this.fileRepositoryData as FileRepositoryResponse;
              const blankFileInfo = {
                id: null,
                name: fileName,
                originalId: id,
              };
              this.stateProgramItem[field]?.length
                ? this.stateProgramItem[field]?.push(blankFileInfo)
                : Vue.set(this.stateProgramItem, field, [blankFileInfo]);
            }
          }); */
    }
  }

  downloadFile(id: string): void {
    this.store.fileRepository.downloadFileAction(id);
  }

  deleteFile(id: string, field: 'conclusion' | 'implementationPlan'): void {
    this.store.fileRepository.deleteFileAction(id);
    /* .then(() => {
        if (!this.fileRepositoryEror) {
          const fileList = this.stateProgramItem[field]?.filter(item => item.originalId !== id);
          Vue.set(this.stateProgramItem, field, fileList);
        }
      }); */
  }

  saveDocument() {
    if (this.documentEditOrCreate.name === undefined) {
      eventBus.$emit('notification:message', {
        text: 'Обязательное поле "Наименование" не заполненно',
        type: 'error',
      });
    } else if (this.documentEditOrCreate.docNum === undefined) {
      eventBus.$emit('notification:message', {
        text: 'Обязательное поле "Номер" не заполненно',
        type: 'error',
      });
    } else if (this.documentEditOrCreate.docDate === undefined) {
      eventBus.$emit('notification:message', {
        text: 'Обязательное поле "Дата" не заполненно',
        type: 'error',
      });
    } else {
      if (this.documentEditOrCreate.index || this.documentEditOrCreate.id) {
        this.store.deedItem.updateDocument(this.documentEditOrCreate);
      } else {
        this.documentEditOrCreate.index = Math.floor(
          Math.random() * 10000
        ).toString();
        this.store.deedItem.addDocument(this.documentEditOrCreate);
      }
      this.$router.go(-1);
      this.documentEditOrCreate = {
        index: '',
        id: null,
        active: false,
      };
    }
  }

  onCancelClick() {
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
