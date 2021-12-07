<template>
  <main-layout title="Новый работодатель">
    <div class="form-add-new-work-action">
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Наименование:
          </span>
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('name', 'newEmployer')"
            :value="newEmployer.name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Тип:
          </span>
        </v-col>
        <v-col cols="6">
          <autocomplete-component
            :items="['ИП', 'ООО', 'ГУ', 'МУП', 'ОАО',]"
          >
            <template #selection="data">
              {{ data.item }}
            </template>
            <template #item="{item}">
              <v-list-item-content
                @click="updatePropsSpech(item, 'type', 'newEmployer')"
              >
                {{ item }}
              </v-list-item-content>
            </template>
          </autocomplete-component>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Регистрационный номер в ПФР:
        </v-col>
        <v-col cols="6">
          <input-component
            @input="updateProps('pfrRegNum', 'newEmployer')"
            :value="newEmployer.pfrRegNum"
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
            :value="newEmployer.active"
          />
        </v-col>
      </v-row>
      <v-row class="global-button">
        <v-col
          class="left-auto"
          cols="auto"
        >
          <button-component
            @click="saveObj(
              ['name', 'type'],
              newEmployer,
              'listEmployers',
            )"
            size="micro"
            title="Сохранить"
            variant="primary"
            class="button-save"
          />
        </v-col>
        <v-col cols="auto">
          <router-link :to="{name: 'FormAddNewPeopleInNeety'}">
            <button-component
              size="micro"
              title="Отмена"
              class="button-save"
            />
          </router-link>
        </v-col>
      </v-row>
    </div>
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
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';
import AutocompleteComponent from '@/components/shared/inputs/AutocompleteComponent.vue';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';

@Component({
  name: 'FormAddNewEmployer',
  components: {
    MainLayout,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    AutocompleteComponent,
    Datepicker,
  },
})

export default class FormAddNewEmployer extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;
  newEmployer = this.myStore.state.newEmployer;

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
