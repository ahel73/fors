<template>
  <main-layout
    title="Список физических лиц"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="headers"
        >
          <template #[`tabs.after`]>
            <v-row>
              <v-col
                cols="12"
                class="d-flex align-start"
              >
                <filter-component
                  @onSearch="handleSearch"
                  @onReset="handleReset"
                  :initial-items="items"
                  :filters="filters"
                />
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
                  @click="handleExportMeasuresInXlsx"
                  type="text"
                  text="Экспорт списка"
                  class="ml-4"
                  icon="mdi-arrow-collapse-down"
                />
                <router-link :to="{name: 'FormAddNewPeopleInNeety'}">
                  <icon-button
                    @click="handleOpenMeasure"
                    class="ml-3"
                    type="text"
                    icon="mdi-plus-circle"
                    text="Добавить"
                  />
                </router-link>
              </v-col>
            </v-row>
          </template>
        </data-table>
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
// import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
// import Store from '@/store/store';
import MainLayout from '@/layouts/MainLayout.vue';
import DataTable from '@/components/shared/table/DataTable.vue';
import ColumnsView from '@/components/shared/table/ColumnsView/ColumnsView.vue';
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
// import { TableHeaders } from '@/components/shared/table/DataTable.types';

export default {
  name: 'ListPeopleInNeetyPage',
  components: {
    MainLayout,
    DataTable,
    ColumnsView,
    FilterComponent,
    IconButton,
  },
  data() {
    return {
      store: useStore(this.$store),
      itemIdToDelete: null,
      deleteDialog: false,
      headers: [],
    };
  },
  computed: {
    mainLayoutText() {
      return `Сводный список участников ${this.itemIdToDelete}`;
    },
    regions() {
      return this.store.participants.state?.regions;
    },
  },
  mounted() {
    this.store.participants.fetchRegions();
  },
};
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
