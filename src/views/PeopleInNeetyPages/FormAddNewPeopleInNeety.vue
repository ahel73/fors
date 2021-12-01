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
            Фамилия:
          </v-col>
          <v-col cols="8">
            <input-component
              @input="up"
              :value="$store.state.name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Имя:
          </v-col>
          <v-col cols="8">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Фамилия 2:
          </v-col>
          <v-col cols="8">
            <input
              @input="up"
              :value="$store.getters.value"
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Отчество:
          </v-col>
          <v-col cols="8">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Дата рождения:
          </v-col>
          <v-col cols="4">
            <date-picker />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Пол:
          </v-col>
          <v-col cols="4">
            <radio-group-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Место жительства:
          </v-col>
          <v-col cols="8">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Место прибывания:
          </v-col>
          <v-col cols="8">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Дата регистрации:
          </v-col>
          <v-col cols="4">
            <date-picker />
          </v-col>
          <v-col cols="1">
            Код МО:
          </v-col>
          <v-col cols="3">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Документ удостоверяющий личность:
          </v-col>
          <v-col cols="8">
            <input-component
              @click="click"
              :value="value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            СНИЛС:
          </v-col>
          <v-col cols="4">
            <input-component />
          </v-col>
          <v-col cols="1">
            ИНН:
          </v-col>
          <v-col cols="3">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Телефон:
          </v-col>
          <v-col cols="4">
            <input-component />
          </v-col>
          <v-col cols="1">
            ОГРНИП:
          </v-col>
          <v-col cols="3">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Эл. почта:
          </v-col>
          <v-col cols="8">
            <input-component />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            Статус:
          </v-col>
          <v-col cols="8">
            <select-component :items="['Черновик', 2, 3]" />
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
          <template #[`item.actions`]="{ item }">
            <div class="d-flex justify-center flex-nowrap">
              <span class="table-action__wrapper">
                <base-action
                  @click="handleOpenfamilyMembers(item)"
                  hint="Редактировать"
                >
                  <edit-icon />
                </base-action>
              </span>
              <span class="table-action__wrapper">
                <base-action
                  @click="handleDeleteFamilyPeople(item)"
                  hint="Удалить"
                >
                  <delete-icon />
                </base-action>
              </span>
            </div>
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

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import DatePicker from '@/components/shared/Datepicker/Datepicker.vue';
import RadioGroupComponent from '@/components/shared/inputs/RadioGroupComponent.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import DataTable from '@/components/shared/table/DataTable.vue';

export default {
  components: {
    MainLayout,
    InputComponent,
    DatePicker,
    RadioGroupComponent,
    SelectComponent,
    ButtonComponent,
    IconButton,
    DataTable,
  },
  data() {
    return {
      tab: '',
      headers: [
      ],
    };
  },
  computed: {
    value() {
      return this.$store.getters.value;
    },
  },
  methods: {
    click() {
      alert('открывается модальное окно добавления удостоверяющего документа');
    },
    up(event) {
      console.log(event);
      this.$store.state.name = 344;
    },
  },
};
</script>

<style scoped lang="scss">
  .tab-card {
    border: 1px solid black;
    border-radius: 5px;
    border-top: 5px solid rgb(209, 155, 63);
    margin-bottom: 20px;
    padding: 15px;
  }

  .global-button {
    justify-content: end;
  }

  .left-auto {
    margin-left: auto;
  }
</style>
