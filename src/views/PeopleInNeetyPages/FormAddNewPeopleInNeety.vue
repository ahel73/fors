<template>
  <main-layout title="Физическое лицо">
    <v-row>
      <v-col>
        <router-link :to="{name: 'ListPeoplePage'}">
          <icon-button
            class="ml-3"
            type="text"
            text="назад к списку"
          />
        </router-link>
      </v-col>
    </v-row>
    <!-- Табы ререключатели -->
    <v-tabs
      v-model="tab"
      background-color="white"
    >
      <v-tab key="generalInformation ">
        Общие сведения
      </v-tab>
      <v-tab key="workerActivity">
        Трудовая деятельность
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- Общие данные -->
      <v-tab-item
        class="tab-card"
        key="generalInformation"
      >
        <v-row>
          <v-col cols="4">
            <span class="required-field">
              Фамилия:
            </span>
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('surname', 'newPersonNeedy')"
              :value="newPerson.surname"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <span class="required-field">
              Имя:
            </span>
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('name', 'newPersonNeedy')"
              :value="newPerson.name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <span class="required-field">
              Отчество:
            </span>
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('patronymic', 'newPersonNeedy')"
              :value="newPerson.patronymic"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <span class="required-field">
              Дата рождения:
            </span>
          </v-col>
          <v-col cols="4">
            <datepicker
              @change="updatePropsSpech($event, 'birthDate', 'newPersonNeedy')"
              @click:clear="updatePropsSpech( '', 'birthDate', 'newPersonNeedy')"
              :starting-year="yearInterval"
              :value="newPerson.birthDate"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Пол:
          </v-col>
          <v-col cols="4">
            <radio-group-component
              @change="updatePropsSpech($event, 'sex', 'newPersonNeedy')"
              inner-label-yes="Мужской"
              inner-label-no="Женский"
              value-yes="M"
              value-no="W"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Место жительства:
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('residence', 'newPersonNeedy')"
              :value="newPerson.residence"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Место прибывания:
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('location', 'newPersonNeedy')"
              :value="newPerson.location"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Дата регистрации:
          </v-col>
          <v-col cols="4">
            <datepicker
              @change="updatePropsSpech($event, 'regDate', 'newPersonNeedy')"
              @click:clear="updatePropsSpech( '', 'regDate', 'newPersonNeedy')"
              :starting-year="yearInterval"
              :value="newPerson.regDate"
            />
          </v-col>
          <v-col cols="1">
            Код МО:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('codMO', 'newPersonNeedy')"
              :value="newPerson.codMO"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Документ удостоверяющий личность:
          </v-col>
          <v-col cols="8">
            <router-link :to="{name: 'FormAddDocument'}">
              <input-component
                :value="newPerson.identityDocs.length ? newPerson.identityDocs[0].type.name : ''"
              />
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <span class="required-field">
              СНИЛС:
            </span>
          </v-col>
          <v-col cols="4">
            <input-component
              @input="updateProps('snils', 'newPersonNeedy')"
              :value="newPerson.snils"
            />
          </v-col>
          <v-col cols="1">
            ИНН:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('inn', 'newPersonNeedy')"
              :value="newPerson.inn"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Телефон:
          </v-col>
          <v-col cols="4">
            <input-component
              @input="updateProps('phoneNumber', 'newPersonNeedy')"
              :value="newPerson.phoneNumber"
            />
          </v-col>
          <v-col cols="1">
            ОГРНИП:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('ogrnip', 'newPersonNeedy')"
              :value="newPerson.ogrnip"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Эл. почта:
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('email', 'newPersonNeedy')"
              :value="newPerson.email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Статус:
          </v-col>
          <v-col cols="8">
            <input-component
              value="Черновик"
              :disabled="true"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <button-component
              size="micro"
              title="Зарегистрировать"
              variant="primary"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              size="micro"
              title="Отменить регистрацию"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              size="micro"
              title="Восстановить"
              class="button-save"
            />
          </v-col>
          <v-col
            class="left-auto"
            cols="auto"
          >
            <button-component
              size="micro"
              title="Сохранить"
              variant="primary"
              class="button-save"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              size="micro"
              title="Отменить"
              class="button-save"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <!-- Трудовая деятельность -->
      <v-tab-item
        class="tab-card"
        key="workerActivity"
      >
        <v-row>
          <v-col>
            <router-link :to="{name: 'FormAddNewWorkerActivity'}">
              <icon-button
                class="ml-3"
                type="text"
                icon="mdi-plus-circle"
                text="Добавить новую трудовую деятельность"
              />
            </router-link>
          </v-col>
        </v-row>
        <data-table
          :headers="headers"
          :items="[]"
          :hide-footer="true"
        >
          <!--item перенеси в фигурные скобки  -->
          <template #[`item.actions`]="{}">
            <v-icon
              small
              class="mr-2"
            >
              mdi-eye
            </v-icon>
            <v-icon
              small
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
            >
              mdi-delete
            </v-icon>
          </template>
        </data-table>
      </v-tab-item>
    </v-tabs-items>
    <!-- Глобальные кнопки -->
    <v-row class="global-button">
      <v-col cols="auto">
        <button-component
          size="micro"
          title="Сохранить"
          variant="primary"
          class="button-save"
        />
      </v-col>
      <v-col cols="auto">
        <router-link :to="{name: 'ListPeoplePage'}">
          <button-component
            size="micro"
            title="Отменить"
            class="button-save"
          />
        </router-link>
      </v-col>
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
// import { mapState } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';
import RadioGroupComponent from '@/components/shared/inputs/RadioGroupComponent.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import { methods } from '@/store/PeopleInNeetyPages/functions.ts';

console.log(methods);

@Component({
  name: 'FormAddNewPeopleInNeety',
  components: {
    MainLayout,
    InputComponent,
    Datepicker,
    RadioGroupComponent,
    SelectComponent,
    ButtonComponent,
    IconButton,
    DataTable,
  },
})

export default class FormAddNewPeopleInNeety extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;
  newPerson = this.myStore.state.newPersonNeedy;
  tab = '';
  yearInterval = (new Date()).getFullYear() - 100;
  headers = [
    { text: 'Фамилия', value: 'surname' },
    { text: 'Имя', value: 'name' },
    { text: 'Отчество', value: 'patronymic' },
    { text: 'Дата рождения', value: 'birth' },
    { text: 'ИНН', value: 'inn' },
    { text: 'Место жительства/пребывания', value: 'residence' },
    { text: 'Действия', value: 'actions' },
  ];

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
}
</script>

<style scoped lang="scss">
  .tab-card {
    border-top: 1px solid rgb(193, 193, 193);
    padding-top: 50px;
  }

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
    justify-content: end;
  }

  .left-auto {
    margin-left: auto;
  }

  .global-button {
    margin-top: 30px
  }
</style>
