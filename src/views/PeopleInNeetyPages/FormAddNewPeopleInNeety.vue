<template>
  <main-layout
    class="form-add-new-people-in-neety"
    title="Физическое лицо"
  >
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
              :value="newPerson.surname || ''"
              :disabled="!flagNew"
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
              :value="newPerson.name || ''"
              :disabled="!flagNew"
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
              :value="newPerson.patronymic || ''"
              :disabled="!flagNew"
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
              v-if="flagNew"
              @change="updatePropsSpech($event, 'birthDate', 'newPersonNeedy')"
              @click:clear="updatePropsSpech( '', 'birthDate', 'newPersonNeedy')"
              :starting-year="yearInterval"
              :value="newPerson.birthDate || ''"
            />
            <input-component
              v-else
              :value="newPerson.birthDate || ''"
              :disabled="true"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Пол:
          </v-col>
          <v-col cols="4">
            <radio-group-component
              v-if="flagNew"
              @change="updatePropsSpech($event, 'sex', 'newPersonNeedy')"
              inner-label-yes="Мужской"
              inner-label-no="Женский"
              value-yes="M"
              value-no="W"
            />
            <span
              v-else
            >
              {{ (newPerson.sex === 'M') ? 'Мужчина' : 'Женщина' }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Место жительства:
          </v-col>
          <v-col cols="8">
            <input-component
              @input="updateProps('residence', 'newPersonNeedy')"
              :value="newPerson.residence || ''"
              :disabled="!flagNew"
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
              :value="newPerson.location || ''"
              :disabled="!flagNew"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Дата регистрации:
          </v-col>
          <v-col cols="4">
            <datepicker
              v-if="flagNew"
              @change="updatePropsSpech($event, 'regDate', 'newPersonNeedy')"
              @click:clear="updatePropsSpech( '', 'registrationDate', 'newPersonNeedy')"
              :starting-year="yearInterval"
              :value="newPerson.registrationDate || ''"
              :disabled="!flagNew"
            />
            <input-component
              v-else
              :value="newPerson.registrationDate || ''"
              :disabled="true"
            />
          </v-col>
          <v-col cols="1">
            Код МО:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('areaCode', 'newPersonNeedy')"
              :value="newPerson.areaCode || ''"
              :disabled="!flagNew"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Документ удостоверяющий личность:
          </v-col>
          <v-col cols="8">
            <router-link :to="flagNew ? {name: 'FormAddDocument'} : ''">
              <input-component
                :value="newPerson.identityDoc ? newPerson.identityDoc.type.name : ''"
                :disabled="!flagNew"
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
              :value="newPerson.snils || ''"
              :disabled="!flagNew"
            />
          </v-col>
          <v-col cols="1">
            ИНН:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('inn', 'newPersonNeedy')"
              :value="newPerson.inn || ''"
              :disabled="!flagNew"
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
              :value="newPerson.phoneNumber || ''"
              :disabled="!flagNew"
            />
          </v-col>
          <v-col cols="1">
            ОГРНИП:
          </v-col>
          <v-col cols="3">
            <input-component
              @input="updateProps('ogrnip', 'newPersonNeedy')"
              :value="newPerson.ogrnip || ''"
              :disabled="!flagNew"
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
              :value="newPerson.email || ''"
              :disabled="!flagNew"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Статус:
          </v-col>
          <v-col cols="8">
            <input-component
              :value="flagNew ? 'Черновик' : newPerson.status.name"
              :disabled="true"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <!-- Трудовая деятельность -->
      <v-tab-item
        class="tab-card"
        key="workerActivity"
      >
        <v-row
          v-if="flagNew"
          class="top-row"
        >
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
          :headers="headersWorks"
          :items="newPerson.works"
          :hide-footer="true"
        >
          <template #[`item.actions`]="{}">
            <v-icon
              v-if="flagNew"
              small
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="flagNew"
              small
            >
              mdi-delete
            </v-icon>
            <span v-if="!flagNew">
              -
            </span>
          </template>
        </data-table>
      </v-tab-item>
    </v-tabs-items>
    <!-- Глобальные кнопки -->
    <v-row class="global-button">
      <v-col
        v-if="flagNew"
        cols="auto"
      >
        <button-component
          size="micro"
          title="Сохранить"
          variant="primary"
          class="button-save"
        />
      </v-col>
      <v-col
        v-if="flagNew"
        cols="auto"
      >
        <router-link :to="{name: 'ListPeoplePage'}">
          <button-component
            size="micro"
            title="Отменить"
            class="button-save"
          />
        </router-link>
      </v-col>
      <v-col
        v-if="!flagNew"
        cols="auto"
      >
        <button-component
          @click="exitReview('ListPeoplePage', 'updatePersonNeedy')"
          size="micro"
          title="Закрыть"
          class="button-save"
        />
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
  flagNew = !this.myStore.state.updatePersonNeedy
  newPerson = this.myStore.state.updatePersonNeedy || this.myStore.state.newPersonNeedy;
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

  headersWorks = [
    { text: 'Место работы', value: 'employer.shortName' },
    { text: 'Трудовая функция', value: 'workFunction' },
    { text: 'Дата приёма', value: 'employmentDate' },
    { text: 'Действия', value: 'actions' },
  ];

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push;
  exitReview = methods.exitReview;
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

  .form-add-new-people-in-neety .top-row {
    margin-bottom: 20px;
  }
</style>
