<template>
  <main-layout title="Добавление новой трудовой деятельности">
    <div class="form-add-new-work-action">
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Место работы:
          </span>
        </v-col>
        <v-col cols="8">
          <v-dialog
            v-model="dialog"
          >
            <template #activator="{ on, attrs }">
              <input-component
                v-on="on"
                :value="newWorkerAction.employer ? newWorkerAction.employer.shortName : '' "
                v-bind="attrs"
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
                  <template #selection="data">
                    <div>
                      <span>{{ data.item.type }}</span> <span>"{{ data.item.name }}"</span>
                    </div>
                  </template>
                  <template #item="{item}">
                    <v-list-item-content
                      @click="selectEmployer = item"
                    >
                      <div>
                        <span>{{ item.type }}</span> <span>"{{ item.name }}"</span>
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
                    class="left-auto  ml-auto"
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
                      @click="dialog = false"
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
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Трудовая функция:
          </span>
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('workFunction', 'newWorkerAction')"
            :value="newWorkerAction.workFunction || ''"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span class="required-field">
            Дата приёма:
          </span>
        </v-col>
        <v-col cols="3">
          <datepicker
            @change="updatePropsSpech($event, 'employmentDate', 'newWorkerAction')"
            @click:clear="updatePropsSpech( '', 'employmentDate', 'newWorkerAction')"
            :starting-year="yearInterval"
            :value="newWorkerAction.employmentDate || ''"
          />
        </v-col>
        <v-col cols="2">
          Дата увольнения
        </v-col>
        <v-col cols="3">
          <datepicker
            @change="updatePropsSpech($event, 'dismissalDate', 'newWorkerAction')"
            @click:clear="updatePropsSpech( '', 'dismissalDate', 'newWorkerAction')"
            :starting-year="yearInterval"
            :value="newWorkerAction.dismissalDate || ''"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Причина увольнения:
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('dismissalReason', 'newWorkerAction')"
            :value="newWorkerAction.dismissalReason || ''"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Документ основание:
        </v-col>
        <v-col cols="8">
          <input-component
            @input="updateProps('baseDoc', 'newWorkerAction')"
            :value="newWorkerAction.baseDoc || ''"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Признак ПФР:
        </v-col>
        <v-col cols="8">
          <checkbox-component
            @change="updatePropsSpech( !newWorkerAction.pfr, 'pfr', 'newWorkerAction')"
            :value="newWorkerAction.pfr"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="left-auto"
          cols="auto"
        >
          <button-component
            @click="saveObj(
              ['workFunction', 'employmentDate'],
              newWorkerAction,
              'work',
              'FormAddNewPeopleInNeety',
            )"
            size="micro"
            title="Сохранить"
            variant="primary"
            class="button-save"
          />
        </v-col>
        <v-col cols="auto">
          <button-component
            @click="clearObj(
              { pfr: true, employer: null },
              newWorkerAction,
              'newWorkerAction',
              'FormAddNewPeopleInNeety',
            )"
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
  listEmployers = this.myStore.state.listEmployers;
  newWorkerAction = this.myStore.state.newWorkerAction
  selectEmployer = null // Выбираемый работодатель
  dialog = false;
  yearInterval = (new Date()).getFullYear() - 100;

  updateProps = methods.updateProps.bind(this);
  updatePropsSpech = methods.updatePropsSpech.bind(this);
  push = methods.push;
  saveObj = methods.saveObj
  clearObj = methods.clearObj
  exitReview = methods.exitReview;

  setEmployer() {
    if (!this.selectEmployer) {
      alert('Работодатель не выбран');
      return false;
    }
    const name = this.selectEmployer.type + ' "' + this.selectEmployer.name + '"';
    this.updatePropsSpech({ shortName: name }, 'employer', 'newWorkerAction');
    this.inputEmployerName = this.selectEmployer.name;
    this.dialog = false;
  }
}
</script>

<style lang="scss">
  .form-add-new-work-action {
    border-top: 1px solid rgb(193, 193, 193);
    padding-top: 50px;
  }

  .v-dialog {
    margin-top: -37%;
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
