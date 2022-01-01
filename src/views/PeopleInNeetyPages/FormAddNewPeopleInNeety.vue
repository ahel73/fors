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
    <!-- Табы переключатели -->
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
        <!-- Фамилия -->
        <v-row>
          <v-col>
            <input-component
              @input="wrapperEventInputFuncs('surname', nameObject, requiredField)"
              :value="getSurname"
              :disabled="flagDisabled"
              label="Фамилия"
              :is-error="requiredField.surname.flagEmpty"
              :required="true"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Имя -->
        <v-row>
          <v-col>
            <input-component
              @input="wrapperEventInputFuncs('name', nameObject, requiredField)"
              :value="getName"
              :disabled="flagDisabled"
              label="Имя"
              :is-error="requiredField.name.flagEmpty"
              :required="true"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Отчество -->
        <v-row>
          <v-col>
            <input-component
              @input="updateProps('patronymic', nameObject)"
              :value="getPatronymic"
              :disabled="flagDisabled"
              label="Имя"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Дата рождения -->
        <v-row>
          <v-col>
            <datepicker
              v-if="!flagDisabled"
              @change="wrapperEventChangeFuncs($event, 'birthDate', nameObject, requiredField)"
              :starting-year="yearStart"
              :value="getBirthDate"
              label="Дата рождения"
              :is-required="true"
              :error="requiredField.birthDate.flagEmpty"
            />
            <input-component
              v-else
              label="Дата рождения"
              :value="getBirthDate"
              :disabled="true"
            />
          </v-col>
        </v-row>

        <!-- Пол -->
        <v-row>
          <v-col>
            <v-radio-group
              v-if="!flagDisabled"
              v-model="newPerson.sex"
              :hide-details="'Пол'"
              row
            >
              <template #label>
                <div class="label">
                  Пол
                </div>
              </template>
              <v-radio
                label="Мужской"
                value="M"
              />
              <v-radio
                label="Женский"
                value="W"
              />
            </v-radio-group>
            <input-component
              v-else
              :value="getSex"
              :disabled="true"
              label="Пол"
            />
          </v-col>
        </v-row>

        <!-- Место жительства -->
        <v-row>
          <v-col>
            <input-component
              @input="updateProps('residence', nameObject)"
              :value="getResidence"
              :disabled="flagDisabled"
              label="Место жительства"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Место регистрации -->
        <v-row>
          <v-col>
            <input-component
              @input="updateProps('location', nameObject)"
              :value="getLocation"
              :disabled="flagDisabled"
              label="Место прибывания"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Дата регистрации -->
        <v-row>
          <v-col>
            <datepicker
              v-if="!flagDisabled"
              @change="updatePropsSpech($event, 'registrationDate', nameObject)"
              @click:clear="updatePropsSpech( '', 'registrationDate', nameObject)"
              :limit-from="startYear"
              :value="getRegistrationDate"
              :disabled="flagDisabled"
              label="Дата регистрации"
            />
            <input-component
              v-else
              :value="getRegistrationDate"
              :disabled="true"
              label="Дата регистрации"
            />
          </v-col>
        </v-row>

        <!-- Код МО -->
        <v-row>
          <v-col>
            <input-component
              @input="updateProps('areaCode', nameObject)"
              :value="getAreaCode"
              :disabled="true"
              label="Код МО"
            />
          </v-col>
        </v-row>

        <!-- Документ удостоверяющиё -->
        <v-row>
          <v-col>
            <input-component
              @click="push('FormAddDocument')"
              @input="clearIdentityDoc(null, 'identityDoc', nameObject, requiredField)"
              :value="getIdentityDoc"
              :disabled="flagDisabled"
              label="Документ удостоверяющий личность"
              :is-error="requiredField.identityDoc.flagEmpty"
              :required="true"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- СНИЛС ИНН -->
        <v-row>
          <v-col cols="6">
            <input-component
              v-mask="'###-###-### ##'"
              @input="updateProps('snils', nameObject)"
              :placeholder="maskSnils"
              :value="getSnils"
              :disabled="flagDisabled"
              label="СНИЛС"
              :clearable="true"
            />
          </v-col>
          <!-- ИНН -->
          <v-col cols="6">
            <input-component
              @input="updateProps('inn', nameObject)"
              @blur="toNull('inn', nameObject)"
              :value="getInn"
              :disabled="flagDisabled"
              label="ИНН"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Телефон ОГРНИП -->
        <v-row>
          <v-col cols="6">
            <input-component
              v-mask="maskPhone"
              @input="updateProps('phoneNumber', nameObject)"
              placeholder="+7 (###) ###-##-##"
              :value="getPhoneNumber"
              :disabled="flagDisabled"
              label="Телефон"
              :clearable="true"
            />
          </v-col>
          <!-- ОГРНИП -->
          <v-col cols="6">
            <input-component
              @input="updateProps('ogrnip', nameObject)"
              :value="getOgrnip"
              :disabled="flagDisabled"
              label="ОГРНИП"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Электронная почта -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('email', nameObject)"
              :value="getEmail"
              :disabled="flagDisabled"
              label="Эл. почта"
              :clearable="true"
            />
          </v-col>
        </v-row>

        <!-- Сатаус -->
        <v-row>
          <v-col cols="12">
            <input-component
              :value="getStatus"
              :disabled="true"
              label="Статус"
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
          <template #[`item.actions`]>
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
      <!-- Если не просмотр -->
      <template
        v-if="flagNew"
        cols="auto"
      >
        <!-- Обновление -->
        <template v-if="flagUpdatePerson">
          <v-col cols="auto">
            <button-component
              @click="updatePerson"
              size="micro"
              title="Обновить данные"
              variant="primary"
              class="button-save"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="offUpdateItem"
              size="micro"
              title="Закрыть"
              class="button-save"
            />
          </v-col>
        </template>

        <!-- Новый -->
        <template v-else>
          <v-col cols="auto">
            <button-component
              @click="createPerson"
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
              title="Отменить"
              class="button-save"
            />
          </v-col>
        </template>
      </template>

      <!-- Кнопка закрытия просмотра -->
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
import { mapState } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';
import RadioGroupComponent from '@/components/shared/inputs/RadioGroupComponent.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import eventBus from '@/utils/bus/event-bus';
import DataTable from '@/components/shared/table/DataTable.vue';
import httpClient from '@/data/http';
import { query } from '@/utils';
import { methods } from '@/store/PeopleInNeetyPages/functions.ts';
import { mask } from 'vue-the-mask';

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
  yearStart = this.myStore.state.yearStart
  flagUpdatePerson = this.myStore.state.flagUpdateItem; // истина если обновляем
  flagNew = this.flagUpdatePerson || !this.myStore.state.updatePersonNeedy; // Истина если новый
  flagDisabled = this.myStore.state.flagViewing; // Истина если просмотр
  // Содержит ссылку на объект нового гражданина или обновляемого (обновляемый может быть ка кдля просмотра так и для редактирования)
  newPerson = this.myStore.state.updatePersonNeedy ? this.myStore.state.updatePersonNeedy : this.myStore.state.newPersonNeedy;
  // Имя объекта с которым работаем в форме
  nameObject = this.myStore.state.updatePersonNeedy ? 'updatePersonNeedy' : 'newPersonNeedy';
  get getStatus() {
    return (this.flagNew && !this.flagUpdatePerson) ? 'Черновик' : this.newPerson.status.name;
  }

  get getEmail() {
    return this.newPerson.email || '';
  }

  get getOgrnip() {
    return this.newPerson.ogrnip || '';
  }

  get getPhoneNumber() {
    return this.newPerson.phoneNumber || '';
  }

  get getInn() {
    return this.newPerson.inn || '';
  }

  get getSnils() {
    return this.newPerson.snils || '';
  }

  get getIdentityDoc() {
    return this.newPerson.identityDoc ? this.newPerson.identityDoc.type.name : '';
  }

  get getAreaCode() {
    return this.newPerson.areaCode || '';
  }

  get getRegistrationDate() {
    return this.newPerson.registrationDate || '';
  }

  get getLocation() {
    return this.newPerson.location || '';
  }

  get getResidence() {
    return this.newPerson.residence || '';
  }

  get getSex() {
    return (this.newPerson.sex === 'M') ? 'Мужской' : (this.newPerson.sex === 'W') ? 'Женский' : 'Не указан';
  }

  get getBirthDate() {
    return this.newPerson.birthDate || '';
  }

  get getPatronymic() {
    return this.newPerson.patronymic || '';
  }

  get getName() {
    return this.newPerson.name || '';
  }

  get getSurname() {
    return this.newPerson.surname || '';
  }

  get getSexM() {
    return !!(this.newPerson.sex === 'M');
  }

  get getSexW() {
    return !!(this.newPerson.sex === 'W');
  }

  // ложь общие сведение, истина трудовая деятельность
  tab = this.myStore.state.flagTabWorker;
  // Количество лет в выподашке по датапикеру
  startYear = '' + (new Date()).getFullYear();
  // Заголовки столбцов таблицы
  headersWorks = [
    { text: 'Место работы', value: 'employer.shortName' },
    { text: 'Трудовая функция', value: 'workFunction' },
    { text: 'Дата приёма', value: 'employmentDate' },
    { text: 'Действия', value: 'actions' },
  ];

  // Объект с имнеами обязательных полей, в случае незаполнености ставим в истину
  requiredField = {
    surname: {
      flagEmpty: false,
      name: 'Фамилия',
    },
    name: {
      flagEmpty: false,
      name: 'Имя',
    },
    birthDate: {
      flagEmpty: false,
      name: 'Дата рождения',
    },
    identityDoc: {
      flagEmpty: false,
      name: 'Документ удостоверяющий личность',
    },
  };

  flagError = false;

  maskPhone = {
    mask: 'qrrerrtrtrr',
    tokens: {
      q: { pattern: /[0-9]/, transform: () => '+7 (' },
      e: { pattern: /[0-9]/, transform: v => v + ') ' },
      r: { pattern: /[0-9]/ },
      t: { pattern: /[0-9]/, transform: v => v + '-' },
    },
  }

  maskSnils = '###-###-### ##'

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push;
  saveObj = methods.saveObj.bind(this);
  clearObj = methods.clearObj.bind(this);
  exitReview = methods.exitReview;
  dispatchObject = methods.dispatchObject.bind(this);
  dispatchUpdateObject = methods.dispatchUpdateObject.bind(this);
  verificationObject = methods.verificationObject.bind(this);
  toNull = methods.toNull.bind(this);
  errorDispatch = methods.errorDispatch.bind(this);
  cleanFlagEmpty = methods.cleanFlagEmpty;
  cleanFlagEmptySpesh = methods.cleanFlagEmptySpesh;

  cancel() {
    this.clearObj(
      {
        status: { active: true, id: 1, name: 'Черновик' },
        works: [],
      },
      this.newPerson,
      'newPersonNeedy',
      'ListPeoplePage'
    );
  }

  offUpdateItem() {
    this.myStore.offUpdateItem();
    this.push('ListPeoplePage');
  }

  createPerson() {
    const flagError = this.verificationObject(this.newPerson, this.requiredField);
    if (!flagError) {
      this.dispatchObject(this.newPerson, '/individual-persons/')
        .then(() => {
          this.clearObj(
            {
              status: { active: true, id: 1, name: 'Черновик' },
              works: [],
            },
            this.newPerson,
            'newPersonNeedy',
            'ListPeoplePage'
          );
        })
        .catch((error) => {
          error.then(r => {
            const objResp = JSON.parse(r);
            this.errorDispatch(objResp.message);
          });
        });
    }
  }

  updatePerson() {
    const flagError = this.verificationObject(this.newPerson, this.requiredField);
    if (!flagError) {
      this.dispatchUpdateObject(this.newPerson, '/individual-persons/')
        .then((body) => {
          if (body.ok) {
            this.myStore.offUpdateItem();
            this.push('ListPeoplePage');
          } else {
            this.errorDispatch('что то пошло не так, попробуйте ещё раз или обратитесь к разработчику');
          }
        })
        .catch((error) => {
          error.then(r => {
            const objResp = JSON.parse(r);
            this.errorDispatch(objResp.message);
          });
        });
    }
  }

  wrapperEventInputFuncs(name: string, nameObject: string, linkObjRequiredField: object) {
    this.updateProps(name, nameObject);
    this.cleanFlagEmpty(name, linkObjRequiredField);
  }

  test() {
    console.log(event.target);
    console.log(event.currentTarget);
  }

  wrapperEventChangeFuncs(value, name: string, nameObject: string, linkObjRequiredField: object) {
    console.log(event);
    console.log(value);
    this.updatePropsSpech(value, name, nameObject);
    this.cleanFlagEmptySpesh(value, name, linkObjRequiredField);
  }

  clearIdentityDoc(value, name: string, nameObject: string, linkObjRequiredField: object) {
    this.updatePropsSpech(value, name, nameObject);
    this.push('FormAddDocument');
  }

  mounted() {
    if (this.myStore.state.flagTabWorker) {
      this.myStore.noActiveTabWorker();
    }
  }

  beforeDestroy() {
    if (this.flagDisabled) this.myStore.exitViewing();
  }
}
</script>

<style scoped lang="scss">
  .tab-card {
    border-top: 1px solid rgb(193, 193, 193);
    padding-top: 50px;
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

  .error-datepicker .label {
    color: red;
  }

  .error-datepicker  .v-input__slot {
    border-color: red;
  }
</style>
