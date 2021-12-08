<template>
  <main-layout
    title="Список физических лиц"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="$store.__vxs_modules__.get('peopleInNeety').module.state.headerTablePeopleInNeety"
          :items="$store.__vxs_modules__.get('peopleInNeety').module.state.listPeopleInNeety"
        >
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
                <columns-view />
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
          <template #[`item.actions`]="{ item }">
            <v-icon
              @click="viewing(item, '/individual-persons/')"
              small
              class="mr-2"
            >
              mdi-eye
            </v-icon>
            <v-icon
              @click="event(item)"
              small
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              @click="deleteItem(item)"
              small
            >
              mdi-delete
            </v-icon>
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
// import axios from 'axios';
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
  },
})

export default class ListPeopleInNeetyPage extends Vue {
  store: Store = useStore(this.$store);
  myStore = this.store.peopleInNeety;

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

  viewing(item, string) {
    this.getOne(string, item.id)
      .then(item => {
        console.log(item);
        this.store.peopleInNeety.viewing(item);
        this.push('FormAddNewPeopleInNeety');
      });
  }

  created() {
    this.getGroop('/individual-persons/find/')
      .then(user => {
        console.log(user.data);
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
