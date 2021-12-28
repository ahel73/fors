<template>
  <main-layout title="Удостоверение личности">
    <form>
      <!-- Вид удостоверения -->
      <v-row>
        <v-col>
          <autocomplete-component
            :items="typeDocs"
            label="Вид удостоверения"
            :error="requiredField.type"
            :required="true"
          >
            <template #selection="{item}">
              {{ item.name }}
            </template>
            <template #item="{item}">
              <v-list-item-content
                @click="updatePropsSpech(item, 'type', 'newIdentityDoc')"
              >
                {{ item.name }}
              </v-list-item-content>
            </template>
          </autocomplete-component>
        </v-col>
      </v-row>
      <!--Серия и номер  -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('seriesNumber', 'newIdentityDoc')"
            :value="newIdentityDoc.seriesNumber"
            label="Серия и номер"
            :is-error="requiredField.seriesNumber"
            :required="true"
            :clearable="true"
          />
        </v-col>
      </v-row>
      <!-- Дата выдачи -->
      <v-row>
        <v-col>
          <datepicker
            @change="updatePropsSpech($event, 'issueDate', 'newIdentityDoc')"
            @click:clear="updatePropsSpech( '', 'issueDate', 'newIdentityDoc')"
            :starting-year="yearStart"
            :value="newIdentityDoc.issueDate"
            label="Дата выдачи"
            :is-required="true"
          />
        </v-col>
      </v-row>
      <!--  Кем выдан -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('authority', 'newIdentityDoc')"
            :value="newIdentityDoc.authority"
            label="Кем выдан"
            :clearable="true"
          />
        </v-col>
      </v-row>
      <!-- Действующий -->
      <v-row>
        <v-col>
          <checkbox-component
            @change="updatePropsSpech( !newIdentityDoc.active, 'active', 'newIdentityDoc')"
            :value="newIdentityDoc.active"
            label="Действующий"
            :clearable="true"
          />
        </v-col>
      </v-row>
      <!-- Кнопки -->
      <v-row class="global-button">
        <v-col
          cols="auto"
        >
          <button-component
            @click="addIdentityDoc"
            size="micro"
            title="Сохранить"
            variant="primary"
            class="button-save"
          />
        </v-col>
        <v-col cols="auto">
          <button-component
            @click="cancel"
            size="micro"
            title="Отмена"
            class="button-save"
          />
        </v-col>
      </v-row>
    </form>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import { methods } from '@/store/PeopleInNeetyPages/functions.ts';
import MainLayout from '@/layouts/MainLayout.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';
import AutocompleteComponent from '@/components/shared/inputs/AutocompleteComponent.vue';
import httpClient from '@/data/http';
import { query } from '@/utils';

@Component({
  name: 'FormAddDocument',
  components: {
    MainLayout,
    ButtonComponent,
    InputComponent,
    Datepicker,
    CheckboxComponent,
    AutocompleteComponent,
  },
})

export default class FormAddNewPeopleInNeety extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;
  newIdentityDoc = this.myStore.state.newIdentityDoc;
  yearStart = this.myStore.state.yearStart

  // массив куда загружаются типы документов
  typeDocs = [];

  // Объект с имнеами обязательных полей, в случае незаполнености ставим в истину
  requiredField = {
    type: false,
    seriesNumber: false,
    issueDate: false,
  };

  flagError = false;

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push
  saveObj = methods.saveObj
  clearObj = methods.clearObj
  verificationObject = methods.verificationObject.bind(this);
  getGroupList = methods.getGroupList.bind(this);

  cancel() {
    this.clearObj(
      { active: true },
      this.newIdentityDoc,
      'newIdentityDoc',
      'FormAddNewPeopleInNeety'
    );
  }

  addIdentityDoc() {
    this.flagError = this.verificationObject(this.newIdentityDoc, this.requiredField);
    if (!this.flagError) {
      this.saveObj(
        this.newIdentityDoc,
        'identityDocs'
      );
      this.clearObj(
        { active: true },
        this.newIdentityDoc,
        'newIdentityDoc',
        'FormAddNewPeopleInNeety'
      );
    }
  }

  created() {
    this.getGroupList('/identity-doc-types/')
      .then(user => {
        this.typeDocs = user;
      });
  }
}
</script>

<style lang="scss">
  .global-button {
    display: flex;
    justify-content: end;
  }
</style>
