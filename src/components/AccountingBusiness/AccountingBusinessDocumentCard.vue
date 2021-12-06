<template>
  <main-layout title="Документ">
    <v-row>
      <v-col cols="12">
        <input-component
          v-model="documentEditOrCreate.name"
          label="Наименование"
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <input-component
          v-model="documentEditOrCreate.docNum"
          label="Номер"
          required
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
          v-model="documentEditOrCreate.isActual"
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
  };

  mounted() {
    this.getControllerData();
    if (this.$route.name === 'editDocument') {
      this.fetchDocument();
    }
  }

  get itemDocument() {
    return this.store.deedItem.state.itemEdit;
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

  saveDocument() {
    if (this.documentEditOrCreate.index || this.documentEditOrCreate.id) {
      this.store.deedItem.updateDocument(this.documentEditOrCreate);
    } else {
      this.documentEditOrCreate.index = Math.floor(Math.random() * 10000).toString();
      this.store.deedItem.addDocument(this.documentEditOrCreate);
    }
    this.$router.go(-1);
    this.documentEditOrCreate = {
      index: '',
      id: null,
    };
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
