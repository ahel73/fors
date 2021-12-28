<!-- Страница добавления нового работодателя -->
<template>
  <main-layout title="Новый работодатель">
    <div class="form-add-new-work-action">
      <!-- Тип -->
      <v-row>
        <v-col>
          <autocomplete-component
            :items="typeEmployer"
            label="Тип"
            :required="true"
            :error="requiredField.type"
          >
            <template #selection="{item}">
              {{ item.name }}
            </template>
            <template #item="{item}">
              <v-list-item-content
                @click="updatePropsSpech(item, 'type', 'newEmployer')"
              >
                {{ item.name }}
              </v-list-item-content>
            </template>
          </autocomplete-component>
        </v-col>
      </v-row>
      <!-- Наименование -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('name', 'newEmployer')"
            :clearable="true"
            :value="newEmployer.name"
            label="Наимнование"
          />
        </v-col>
      </v-row>
      <!-- Краткое наимнование -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('shortName', 'newEmployer')"
            :clearable="true"
            :value="newEmployer.shortName"
            label="Краткое наимнование"
            :is-error="requiredField.shortName"
            :required="true"
          />
        </v-col>
      </v-row>
      <!-- ИНН -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('inn', 'newEmployer')"
            :clearable="true"
            :value="newEmployer.inn"
            label="ИНН"
            :is-error="requiredField.inn"
            :required="true"
          />
        </v-col>
      </v-row>
      <!-- Регистрационный номер в ПФР -->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('pfrRegistrationNumber', 'newEmployer')"
            :clearable="true"
            :value="newEmployer.pfrRegistrationNumber"
            label=" Регистрационный номер в ПФР"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <checkbox-component
            @change="updatePropsSpech( !newEmployer.active, 'active', 'newEmployer')"
            :clearable="true"
            :value="newEmployer.active"
            label="Действующий"
          />
        </v-col>
      </v-row>
      <v-row class="global-button">
        <v-col
          class="left-auto"
          cols="auto"
        >
          <button-component
            @click="addNewEmployer"
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
import httpClient from '@/data/http';
import { query } from '@/utils';

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
  typeEmployer = [];
  requiredField = {
    type: false,
    shortName: false,
    inn: false,
  };

  flagError = false;

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push
  saveObj = methods.saveObj
  clearObj = methods.clearObj
  dispatchObject = methods.dispatchObject.bind(this);
  verificationObject = methods.verificationObject.bind(this);
  getGroupList = methods.getGroupList.bind(this);

  addNewEmployer() {
    this.flagError = this.verificationObject(this.newEmployer, this.requiredField);
    if (!this.flagError) {
      this.dispatchObject(this.newEmployer, '/employers/');
      this.clearObj(
        { active: true },
        this.newEmployer,
        'newEmployer',
        'FormAddNewWorkerActivity'
      );
    }
  }

  cancel() {
    this.clearObj(
      { active: true },
      this.newEmployer,
      'newEmployer',
      'FormAddNewWorkerActivity'
    );
  }

  created() {
    this.getGroupList('/employer-types/')
      .then(user => {
        console.log(user);
        this.typeEmployer = user;
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
