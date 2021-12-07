<template>
  <main-layout title="Добавление новой трудовой деятельности">
    <div class="form-add-new-work-action">
      <v-row>
        <v-col cols="4">
          Место работы:
        </v-col>
        <v-col cols="8">
          <v-dialog>
            <template #activator="{ on, attrs }">
              <input-component
                v-on="on"
                :value="value"
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
                    {{ data.item }}
                  </template>
                  <template #item="{item}">
                    <v-list-item-content>
                      {{ item }}
                    </v-list-item-content>
                  </template>
                </autocomplete-component>
              </v-card-text>

              <v-card-actions>
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
                  <v-col cols="auto">
                    <button-component
                      size="micro"
                      title="Отмена"
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
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Трудовая функция:
        </v-col>
        <v-col cols="8">
          <input-component />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Дата приёма:
        </v-col>
        <v-col cols="3">
          <datepicker />
        </v-col>
        <v-col cols="2">
          Дата увольнения
        </v-col>
        <v-col cols="3">
          <datepicker />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Причина увольнения:
        </v-col>
        <v-col cols="8">
          <input-component />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Документ основание:
        </v-col>
        <v-col cols="8">
          <input-component />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Признак ПФР:
        </v-col>
        <v-col cols="8">
          <checkbox-component />
        </v-col>
      </v-row>
      <v-row>
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
}
</script>

<style lang="scss">
  .v-dialog {
    margin-top: -37%;
    overflow-y: visible;
  }

  .v-dialog > .v-card > .v-card__text {
    padding: 25px;
  }
</style>
