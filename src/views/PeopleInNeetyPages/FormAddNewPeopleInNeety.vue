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
        <!-- Фамилия -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('surname', nameJbject)"
              :value="newPerson.surname || ''"
              :disabled="flagDisabled"
              :label="'Фамилия'"
              :is-error="requiredField.surname"
              :required="true"
            />
          </v-col>
        </v-row>

        <!-- Имя -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('name', nameJbject)"
              :value="newPerson.name || ''"
              :disabled="flagDisabled"
              :label="'Имя'"
              :is-error="requiredField.name"
              :required="true"
            />
          </v-col>
        </v-row>

        <!-- Отчество -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('patronymic', nameJbject)"
              :value="newPerson.patronymic || ''"
              :disabled="flagDisabled"
              :label="'Имя'"
            />
          </v-col>
        </v-row>

        <!-- Дата рождения -->
        <v-row>
          <v-col cols="12">
            <datepicker
              v-if="!flagDisabled"
              @change="updatePropsSpech($event, 'birthDate', nameJbject)"
              @click:clear="updatePropsSpech( '', 'birthDate', nameJbject)"
              :limit-to="startYear"
              :limit-from="'1930'"
              :value="newPerson.birthDate || ''"
              :label="'Дата рождения'"
              :is-required="true"
              :error="requiredField.birthDate"
            />
            <input-component
              v-else
              :value="newPerson.birthDate || ''"
              :disabled="true"
            />
          </v-col>
        </v-row>

        <!-- Пол -->
        <v-row>
          <v-col cols="12">
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
                :value="'M'"
                :key="'M'"
              />
              <v-radio
                label="Женский"
                :value="'W'"
                :key="'W'"
              />
            </v-radio-group>
            <input-component
              v-else
              :value="(newPerson.sex === 'M') ? 'Мужчина' : (newPerson.sex === 'W') ? 'Женщина' : 'Не указан' "
              :disabled="true"
              label="Пол"
            />
          </v-col>
        </v-row>

        <!-- Место жительства -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('residence', nameJbject)"
              :value="newPerson.residence || ''"
              :disabled="flagDisabled"
              :label="'Место жительства'"
            />
          </v-col>
        </v-row>

        <!-- Мнсто регистрации -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('location', nameJbject)"
              :value="newPerson.location || ''"
              :disabled="flagDisabled"
              :label="'Место прибывания'"
            />
          </v-col>
        </v-row>

        <!-- Дата регистрации -->
        <v-row>
          <v-col cols="12">
            <datepicker
              v-if="!flagDisabled"
              @change="updatePropsSpech($event, 'registrationDate', nameJbject)"
              @click:clear="updatePropsSpech( '', 'registrationDate', nameJbject)"
              :limit-from="startYear"
              :value="newPerson.registrationDate || ''"
              :disabled="flagDisabled"
              :label="'Дата регистрации'"
            />
            <input-component
              v-else
              :value="newPerson.registrationDate || ''"
              :disabled="true"
              :label="'Дата регистрации'"
            />
          </v-col>
        </v-row>

        <!-- Код МО -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('areaCode', nameJbject)"
              :value="newPerson.areaCode || ''"
              :disabled="flagDisabled"
              :label="'Код МО'"
              :is-error="requiredField.areaCode"
              :required="true"
            />
          </v-col>
        </v-row>

        <!-- Документ удостоверяющиё -->
        <v-row>
          <v-col cols="12">
            <router-link :to="flagNew ? {name: 'FormAddDocument'} : ''">
              <input-component
                :value="newPerson.identityDoc ? newPerson.identityDoc.type.name : ''"
                :disabled="flagDisabled"
                :label="'Документ удостоверяющиё'"
                :is-error="requiredField.identityDoc"
                :required="true"
              />
            </router-link>
          </v-col>
        </v-row>

        <!-- СНИЛС ИНН -->
        <v-row>
          <v-col cols="6">
            <input-component
              v-mask="'###-###-### ##'"
              @input="updateProps('snils', nameJbject)"
              :value="newPerson.snils || ''"
              :disabled="flagDisabled"
              :label="'СНИЛС'"
            />
          </v-col>
          <!-- ИНН -->
          <v-col cols="6">
            <input-component
              @input="updateProps('inn', nameJbject)"
              :value="newPerson.inn || ''"
              :disabled="flagDisabled"
              :label="'ИНН'"
            />
          </v-col>
        </v-row>

        <!-- Телефон ОГРНИП -->
        <v-row>
          <v-col cols="6">
            <input-component
              v-mask="'+7(###) ###-##-##'"
              @input="updateProps('phoneNumber', nameJbject)"
              :value="newPerson.phoneNumber || ''"
              :disabled="flagDisabled"
              :label="'Телефон'"
            />
          </v-col>
          <!-- ОГРНИП -->
          <v-col cols="6">
            <input-component
              @input="updateProps('ogrnip', nameJbject)"
              :value="newPerson.ogrnip || ''"
              :disabled="flagDisabled"
              :label="'ОГРНИП'"
            />
          </v-col>
        </v-row>

        <!-- Эоектронная почта -->
        <v-row>
          <v-col cols="12">
            <input-component
              @input="updateProps('email', nameJbject)"
              :value="newPerson.email || ''"
              :disabled="flagDisabled"
              :label="'Эл. почта'"
            />
          </v-col>
        </v-row>

        <!-- Сатаус -->
        <v-row>
          <v-col cols="12">
            <input-component
              :value="(flagNew && !flagUpdatePerson) ? 'Черновик' : newPerson.status.name"
              :disabled="true"
              :label="'Сатаус'"
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
      <!-- Если не просмотр -->
      <template
        v-if="flagNew"
        cols="auto"
      >
        <!-- Обновление -->
        <template v-if="flagUpdatePerson">
          <v-col cols="auto">
            <button-component
              @click="
                flagError=verificationObject(newPerson, requiredField);
                if (!flagError) {
                  dispatchUpdateObject(newPerson, '/individual-persons/')
                    .then((response => {
                      myStore.offUpdateItem();
                      push('ListPeoplePage');
                    }))
                    .catch((error)=>{
                      errorDispatch(error)
                    })
                }
              "
              size="micro"
              title="Обновить данные"
              variant="primary"
              class="button-save"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="
                myStore.offUpdateItem();
                push('ListPeoplePage');
              "
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
              @click="
                flagError=verificationObject(newPerson, requiredField);
                if (!flagError) {
                  dispatchObject(newPerson, '/individual-persons/', requiredField)
                    .then(response => {
                      clearObj(
                        {
                          status: { active: true, id: 1, name: 'Черновик' },
                          works: [],
                        },
                        newPerson,
                        'newPersonNeedy',
                        'ListPeoplePage',
                      )
                    })
                    .catch((error)=>{
                      errorDispatch(error)
                    })
                }
              "
              size="micro"
              title="Сохранить"
              variant="primary"
              class="button-save"
            />
          </v-col>
          <v-col cols="auto">
            <button-component
              @click="clearObj(
                {
                  status: { active: true, id: 1, name: 'Черновик' },
                  works: [],
                },
                newPerson,
                'newPersonNeedy',
                'ListPeoplePage',
              )
              "
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
// import { mapState } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';
import RadioGroupComponent from '@/components/shared/inputs/RadioGroupComponent.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import httpClient from '@/data/http';
import { query } from '@/utils';
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
  flagUpdatePerson = this.myStore.state.flagUpdateItem; // истина если обновляем
  flagNew = this.flagUpdatePerson || !this.myStore.state.updatePersonNeedy; // Истина если новый
  flagDisabled = this.myStore.state.flagViewing; // Истина если просмотр
  // Содержит ссылку на объект нового гражданина или обновляемого (обновляемый может быть ка кдля просмотра так и для редактирования)
  newPerson = this.myStore.state.updatePersonNeedy ? this.myStore.state.updatePersonNeedy : this.myStore.state.newPersonNeedy;
  // Имя объекта с которым работаем в форме
  nameJbject = this.myStore.state.updatePersonNeedy ? 'updatePersonNeedy' : 'newPersonNeedy';
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
    surname: false,
    name: false,
    birthDate: false,
    areaCode: false,
    identityDoc: false,
  };

  flagError = false;

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push;
  saveObj = methods.saveObj.bind(this);
  clearObj = methods.clearObj.bind(this);
  exitReview = methods.exitReview;
  dispatchObject = methods.dispatchObject.bind(this);
  dispatchUpdateObject = methods.dispatchUpdateObject.bind(this);
  verificationObject = methods.verificationObject.bind(this);

  getGroop = async (queryString: string, params: any = {} as any): Promise<any> => {
    const { page = 0, sort = '-id', size } = params;
    const queryParams = query({ ...params, page, sort, size });
    const { data } = await httpClient.post<any>(queryString);
    return data;
  }

  errorDispatch(error) {
    alert(error);
  }

  mounted() {
    if (this.myStore.state.flagTabWorker) {
      this.myStore.noActivTabWorker();
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

  .error-datepicker .label {
    color: red;
  }

  .error-datepicker  .v-input__slot {
    border-color: red;
  }
</style>
