<template>
  <main-layout title="Добавление новой трудовой деятельности">
    <!--  -->
    <v-row>
      <v-col>
        <router-link :to="{name: 'FormAddNewPeopleInNeety'}">
          <button-component
            size="micro"
            title="назад к форме добавления гражданина"
            class="button-save"
          />
        </router-link>
      </v-col>
    </v-row>
    <div class="form-add-new-work-action">
      <v-row>
        <v-col cols="4">
          Место работы:
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
          <date-picker />
        </v-col>
        <v-col cols="2">
          Дата увольнения
        </v-col>
        <v-col cols="3">
          <date-picker />
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
            @click="cancel"
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

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import DatePicker from '@/components/shared/Datepicker/Datepicker.vue';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';

export default {
  components: {
    MainLayout,
    ButtonComponent,
    InputComponent,
    DatePicker,
    CheckboxComponent,
  },
  data() {
    return {
      value: 'кликни на меня',
    };
  },
  methods: {
    click() {
      alert('Должно появиться модальное' +
      ' окно выбора работодателя, в котром есть' +
      'кнопка добавить которая открывает ещё одно модальное окно для создания работодателя если его нет');
    },
  },
};
</script>

<style lang="scss">
  .form-add-new-work-action {
    border: 1px solid #c1c1c1;
    border-radius: 5px;
    margin: 20px 0;
    padding: 25px;
  }
</style>
