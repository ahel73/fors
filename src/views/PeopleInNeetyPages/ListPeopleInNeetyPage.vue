<template>
  <main-layout
    title="Список физических лиц"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="headers"
          :items="$store.__vxs_modules__.get('peopleInNeety').module.state.listPeopleInNeety"
        >
          <!-- Фильтр и кнопки -->
          <template #[`tabs.after`]>
            <v-row>
              <v-col
                cols="12"
                class="d-flex align-start"
              >
                <filter-component />
              </v-col>
            </v-row>
            <v-row class="mb-8">
              <v-col
                cols="12"
                class="d-flex align-start"
              >
                <columns-view
                  @saveColumns="saveColumns"
                  :headers.sync="headers"
                  :columns="columns"
                />
                <icon-button
                  type="text"
                  text="Экспорт списка"
                  class="ml-4"
                  icon="mdi-arrow-collapse-down"
                />
                <router-link :to="{name: 'FormAddNewPeopleInNeety'}">
                  <icon-button
                    class="ml-3"
                    type="text"
                    icon="mdi-plus-circle"
                    text="Добавить"
                  />
                </router-link>
              </v-col>
            </v-row>
          </template>

          <!-- Таблица -->
          <template #[`item.actions`]="{ item }">
            <base-action
              @click="viewing(item, '/individual-persons/')"
              hint="Просмотр"
            >
              <eye-icon />
            </base-action>
            <base-action
              @click="updateObject(item, '/individual-persons/')"
              hint="Редактировать"
            >
              <edit-icon />
            </base-action>
            <base-action
              @click="deleteItem(item)"
              hint="Удалить"
            >
              <delete-icon />
            </base-action>
          </template>
        </data-table>
      </v-col>
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import MainLayout from '@/layouts/MainLayout.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import ColumnsView from '@/components/shared/table/ColumnsView/ColumnsView.vue';
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import EditIcon from '@/components/shared/IconComponent/icons/EditIcon.vue';
import EyeIcon from '@/components/shared/IconComponent/icons/EyeIcon.vue';
import DeleteIcon from '@/components/shared/IconComponent/icons/DeleteIcon.vue';
import httpClient from '@/data/http';
import { query } from '@/utils';
import { methods } from '@/store/PeopleInNeetyPages/functions.ts';

@Component({
  name: 'ListPeopleInNeetyPage',
  components: {
    MainLayout,
    DataTable,
    ColumnsView,
    FilterComponent,
    IconButton,
    BaseAction,
    EditIcon,
    EyeIcon,
    DeleteIcon,
  },
})

export default class ListPeopleInNeetyPage extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;
  headers = this.store.peopleInNeety.state.headerTablePeopleInNeety
  listPeople = this.store.peopleInNeety.state.listPeopleInNeety
  // headers = this.$store.__vxs_modules__.get('peopleInNeety').module.state.headerTablePeopleInNeety
  // listPeople = this.$store.__vxs_modules__.get('peopleInNeety').module.state.listPeopleInNeety
  columns = []
  push = methods.push;

  getGroop = async (queryString: string, params: any = {} as any): Promise<any> => {
    const { page = 0, sort = '-id', size } = params;
    const queryParams = query({ ...params, page, sort, size });
    const { data } = await httpClient.post<any>(queryString);
    return data;
  }

  getOne = async (queryString: string, id: any) => {
    const { data } = await httpClient.get<any>(`${queryString}${id}`);
    return data;
  };

  async deleteItem(item) {
    // console.log(item.id);
    const data = await httpClient.delete<any>(`/individual-persons/${item.id}`);
    console.log(data);
    this.getGroop('/individual-persons/find/')
      .then(user => {
        console.log(user);
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });
  }

  updateObject(item, string) {
    console.log(item.id);
    this.getOne(string, item.id)
      .then(item => {
        console.log(item);
        this.store.peopleInNeety.activeUpdateItem(item);
        this.push('FormAddNewPeopleInNeety');
      });
  }

  viewing(item, string) {
    this.getOne(string, item.id)
      .then(item => {
        console.log(item);
        this.store.peopleInNeety.viewing(item);
        this.push('FormAddNewPeopleInNeety');
      });
  }

  saveColumns(): void {
    const data = { columns: this.columns, sort: this.sort, items: this.items };
    // saveRegistrySettings({ data: data, registry: RegistryType.PROGRAMS });
  }

  setColumns() {
    return this.headers.map(obj => {
      const newObj = JSON.parse(JSON.stringify(obj));
      const requiredFields = ['surname', 'actions'];
      newObj.isDefault = true;
      newObj.isEditable = !requiredFields.includes(newObj.value);
      return newObj;
    });
  }

  created() {
    this.myStore.updatePersonNeedy = null;
    this.myStore.flagTabWorker = 0;
    this.myStore.flagUpdateItem = false;
    this.myStore.flagViewing = false;

    this.getGroop('/individual-persons/find/')
      .then(user => {
        console.log(user);
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });
  }

  beforeMount() {
    this.columns = this.setColumns();
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
