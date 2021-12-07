<template>
  <main-layout title="Удостоверение личности">
    <form>
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Вид удостоверения:
          </span>
        </v-col>
        <v-col cols="8">
          <autocomplete-component
            :items="typeDocs"
          >
            <template #selection="data">
              {{ data.item.name }}
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
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Серия и номер:
          </span>
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('seriesNum', 'newIdentityDoc')"
            :value="newIdentityDoc.seriesNum"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Дата выдачи:
          </span>
        </v-col>
        <v-col cols="4">
          <datepicker
            @change="updatePropsSpech($event, 'issueDate', 'newIdentityDoc')"
            @click:clear="updatePropsSpech( '', 'issueDate', 'newIdentityDoc')"
            :starting-year="yearInterval"
            :value="newIdentityDoc.issueDate"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>
            Кем выдан:
          </span>
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('authority', 'newIdentityDoc')"
            :value="newIdentityDoc.authority"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Действующий:
        </v-col>
        <v-col cols="8">
          <checkbox-component
            @change="updatePropsSpech( !newIdentityDoc.active, 'active', 'newIdentityDoc')"
            :value="newIdentityDoc.active"
          />
        </v-col>
      </v-row>
      <v-row class="global-button">
        <v-col
          cols="auto"
        >
          <button-component
            @click="saveObj(
              ['seriesNum', 'issueDate', 'type'],
              newIdentityDoc,
              'identityDocs',
            )"
            size="micro"
            title="Сохранить"
            variant="primary"
            class="button-save"
          />
        </v-col>
        <v-col cols="auto">
          <button-component
            @click="clearObj({type: null, active: true}, newIdentityDoc)"
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
  yearInterval = (new Date()).getFullYear() - 100;

  typeDocs = [
    { id: 1, name: 'паспорт', active: true },
    { id: 2, name: 'военный билет', active: true },
    { id: 3, name: 'водительское удостоверение', active: true },
    { id: 4, name: 'студенческий билет', active: true },
  ]

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push
  saveObj = methods.saveObj
  clearObj = methods.clearObj
}
</script>

<style lang="scss">
  .required-field {
    position: relative;
  }

  .required-field::after {
    bottom: 40%;
    color: rgb(238, 61, 61);
    content: "\F06C4";
    font-family: "Material Design Icons";
    font-size: 80%;
    font-weight: bold;
    position: absolute;
  }

  .global-button {
    display: flex;
    justify-content: end;
  }
</style>
