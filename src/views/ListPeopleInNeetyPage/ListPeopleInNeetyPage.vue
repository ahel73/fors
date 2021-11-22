<!-- Страница списка граждан нуждающизся в улучшении жилищных условий -->
<template>
  <main-layout
    title="Список физических лиц"
  >
    <list-header
      :actions-header="actionsHeader"
    />
    <list-table
      :headers="headers"
      :entity="entity"
      :actions-table="actionsTable"
    />
    <!-- <v-data-table
      v-model="selected"
      :headers="headers"
      :items="entity"
      :single-select="true"
      must-sort="true"
      show-select
      item-key="text"
      class="elevation-1"
    >    </v-data-table>
    <h3>Наша кастомная таблица </h3>
    <data-table
      v-model="selected"
      :headers="headers"
      :items="entity"
      :single-select="singleSelect"
      must-sort="true"
      show-select
      item-key="text"
      class="elevation-1"
    >    </data-table> -->
    <template v-if="flagAddNewPerson">
      <modal-window-people-in-neety
        @close-modal-window="closeWindow()"
      />
    </template>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import ListHeader from '@/components/ListHeader/ListHeader.vue';
// import DataTable from '@/components/shared/table/DataTable.vue';
import ListTable from '@/components/ListTable/ListTable.vue';
import ModalWindowPeopleInNeety from '@/views/ListPeopleInNeetyPage/ModalWindowPeopleInNeety.vue';
export default {
  components: {
    MainLayout,
    ListHeader,
    // DataTable,
    ListTable,
    ModalWindowPeopleInNeety,
  },
  data() {
    return {
      addNewPerson: false,
      thisVue: this,
      headers: [
        { text: 'Фамилия', value: 'surname', stopIteraror: false },
        { text: 'Имя', value: 'name', stopIteraror: false },
        { text: 'Отчество', value: 'patronymic', stopIteraror: false },
        { text: 'Дата рождения', value: 'birth', stopIteraror: false },
        { text: 'ИНН', value: 'inn', stopIteraror: false },
        { text: 'Место жительства/пребывания', value: 'residence', stopIteraror: false },
        { text: 'Действия', value: 'actions', stopIteraror: true },
      ],
      entity: [
        {
          id: 1,
          surname: 'Иванов',
          name: 'Иван',
          patronymic: 'Иванович',
          birth: '12.12.2012',
          inn: '788877666555',
          residence: 'деревня Гадюкино',
        },
      ],
      actionsTable: [
        {
          name: 'смотреть',
          icon: 'mdi-eye-outline',
          title: '',
          action(id) { alert(this.name + ' ' + id); },
        },
        {
          name: 'редактировать',
          icon: 'mdi-file-edit-outline',
          title: '',
          action(id) { alert(this.name + ' ' + id); },
        },
        {
          name: 'удалить',
          icon: 'mdi-trash-can-outline',
          title: '',
          action(id) { alert(this.name + ' ' + id); },
        },
      ],
      actionsHeader: [
        {
          type: 'text',
          text: 'Настроить вид',
          class: 'ml-4',
          icon: 'mdi-cog-outline',
        },
        {
          type: 'text',
          text: 'Экспорт списка',
          class: 'ml-4',
          icon: 'mdi-arrow-collapse-down',
        },
        {
          click: () => { this.addNewPerson = !this.addNewPerson; },
          type: 'text',
          text: 'Добавить гражданина',
          class: 'ml-4',
          icon: 'mdi-plus-circle-outline',
        },
      ],
    };
  },
  computed: {
    flagAddNewPerson() {
      return this.addNewPerson;
    },
  },
  methods: {
    closeWindow() {
      this.addNewPerson = false;
    },
  },
};
</script>

<style scoped lang="scss">
  :root { margin: 0 }
</style>
