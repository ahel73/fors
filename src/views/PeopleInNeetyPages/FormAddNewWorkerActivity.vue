<template>
  <main-layout title="Добавление новой трудовой деятельности">
    <div class="form-add-new-work-action">
      <v-row>
        <v-col>
          <v-dialog
            v-model="dialog"
          >
            <template #activator="{ on, attrs }">
              <input-component
                v-on="on"
                :value="newWorkerAction.employer ? newWorkerAction.employer.shortName : '' "
                v-bind="attrs"
                label="Место работы"
                :is-error="requiredField.employer"
                :required="true"
              />
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Выбор работодателя
              </v-card-title>

              <v-card-text>
                <autocomplete-component
                  :items="listEmployers"
                >
                  <!-- То что отображается -->
                  <template #selection="data">
                    <div>
                      <span>
                        {{ data.item.type.name }}
                      </span>
                      <span>
                        "{{ data.item.shortName }}"
                      </span>
                    </div>
                  </template>
                  <!-- Список -->
                  <template #item="{item}">
                    <v-list-item-content
                      @click="setSelectEmployer(item)"
                    >
                      <div>
                        <span>
                          {{ item.type.name }}
                        </span>
                        <span>
                          "{{ item.shortName }}"
                        </span>
                      </div>
                    </v-list-item-content>
                  </template>
                </autocomplete-component>
              </v-card-text>

              <v-card-actions class="row-bottom">
                <v-row>
                  <v-col
                    class="left-auto"
                    cols="auto"
                  >
                    <router-link :to="{name: 'FormAddNewEmployer'}">
                      <button-component
                        size="micro"
                        title="Добавить работодателя"
                        variant="primary"
                        class="button-save"
                      />
                    </router-link>
                  </v-col>
                  <v-col
                    class="left-auto ml-auto"
                    cols="auto"
                  >
                    <button-component
                      @click="setEmployer"
                      size="micro"
                      title="Сохранить"
                      variant="primary"
                      class="button-save"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <button-component
                      @click="exitSelectEmployer"
                      size="micro"
                      title="Отмена"
                      class="button-save"
                    />
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <!-- Трудовая функция-->
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('workFunction', 'newWorkerAction')"
            :clearable="true"
            :value="getWorkFunction"
            label="Трудовая функция"
            :is-error="requiredField.workFunction"
            :required="true"
          />
        </v-col>
      </v-row>
      <!-- Дата приёма -->
      <v-row>
        <v-col cols="6">
          <datepicker
            @change="updatePropsSpech($event, 'employmentDate', 'newWorkerAction')"
            @click:clear="updatePropsSpech( '', 'employmentDate', 'newWorkerAction')"
            :starting-year="yearStart"
            :value="getEmploymentDate"
            label="Дата приёма"
            :is-required="true"
          />
        </v-col>
        <v-col cols="6">
          <datepicker
            @change="updatePropsSpech($event, 'dismissalDate', 'newWorkerAction')"
            @click:clear="updatePropsSpech( '', 'dismissalDate', 'newWorkerAction')"
            :starting-year="yearStart"
            :value="getDismissalDate"
            label="Дата увольнения"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('dismissalReason', 'newWorkerAction')"
            :clearable="true"
            :value="getDismissalReason"
            label="Причина увольнения"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input-component
            @input="updateProps('baseDoc', 'newWorkerAction')"
            :clearable="true"
            :value="getBaseDoc"
            label="Документ основание"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <checkbox-component
            @change="updatePropsSpech( !newWorkerAction.pfr, 'pfr', 'newWorkerAction')"
            :clearable="true"
            :value="newWorkerAction.pfr"
            label="Признак ПФР"
          />
        </v-col>
      </v-row>
      <!-- Кнопки -->
      <v-row>
        <v-col
          class="left-auto"
          cols="auto"
        >
          <button-component
            @click="createWorkerActivity"
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
import Datepicker from '@/components/shared/Datepicker/Datepicker.vue';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';
import AutocompleteComponent from '@/components/shared/inputs/AutocompleteComponent.vue';
import { query } from '@/utils';
import eventBus from '@/utils/bus/event-bus';

@Component({
  name: 'FormAddNewWorkerActivity',
  components: {
    MainLayout,
    ButtonComponent,
    InputComponent,
    Datepicker,
    CheckboxComponent,
    AutocompleteComponent,
  },
})

export default class FormAddNewWorkerActivity extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;
  listEmployers = [];
  newWorkerAction = this.myStore.state.newWorkerAction
  selectEmployer = null // Выбираемый работодатель
  dialog = false;
  yearStart = this.myStore.state.yearStart;
  requiredField = {
    employer: false,
    workFunction: false,
    employmentDate: false,
  };

  flagError = false;

  get getBaseDoc() {
    return this.newWorkerAction.baseDoc || '';
  }

  get getDismissalReason() {
    return this.newWorkerAction.dismissalReason || '';
  }

  get getDismissalDate() {
    return this.newWorkerAction.dismissalDate || '';
  }

  get getEmploymentDate() {
    return this.newWorkerAction.employmentDate || '';
  }

  get getWorkFunction() {
    return this.newWorkerAction.workFunction || '';
  }

  cancel() {
    this.clearObj(
      { pfr: true },
      this.newWorkerAction,
      'newWorkerAction',
      'FormAddNewPeopleInNeety'
    );
    this.myStore.activeTabWorker();
  }

  exitSelectEmployer() {
    this.dialog = false;
  }

  setSelectEmployer(item) {
    this.selectEmployer = item;
  }

  createWorkerActivity() {
    const flagError = this.verificationObject(this.newWorkerAction, this.requiredField);
    if (!flagError) {
      this.saveObj(
        this.newWorkerAction,
        'work'
      );
      this.clearObj(
        { pfr: true },
        this.newWorkerAction,
        'newWorkerAction',
        'FormAddNewPeopleInNeety'
      );
      this.myStore.activeTabWorker();
    }
  }

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push;
  saveObj = methods.saveObj.bind(this);
  clearObj = methods.clearObj;
  exitReview = methods.exitReview;
  verificationObject = methods.verificationObject.bind(this);
  getGroupFind = methods.getGroupFind.bind(this);

  setEmployer() {
    if (!this.selectEmployer) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Работодатель не выбран',
          type: 'error',
        }
      );
      return false;
    }
    const id = this.selectEmployer.id;
    const shortName = this.selectEmployer.shortName;
    this.updatePropsSpech({ id, shortName }, 'employer', 'newWorkerAction');
    this.inputEmployerName = this.selectEmployer.name;
    this.dialog = false;
  }

  created() {
    this.getGroupFind('/employers/find/')
      .then(user => {
        this.listEmployers = user.data;
      });
  }
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
    justify-content: end;
  }

  .left-auto {
    margin-left: auto;
  }

  .global-button {
    margin-top: 30px
  }

  .form-add-new-work-action {
    border-top: 1px solid rgb(193, 193, 193);
    padding-top: 50px;
  }

  .v-dialog {
    overflow-y: visible;
  }

  .v-dialog > .v-card > .v-card__text {
    padding: 25px;
    padding-top: 60px;
  }

  .ml-auto {
    margin-left: auto;
  }

  .v-dialog > .v-card > .v-card__actions.row-bottom {
    padding-bottom: 25px;
  }

</style>
