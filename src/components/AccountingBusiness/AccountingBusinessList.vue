<template>
  <div class="accountingBusinessList">
    <v-col cols="12">
      <div class="title">
        <span> Список учетных дел </span>
      </div>
    </v-col>
    <v-col>
      <data-table>
        <template
          v-slot:[`tabs.after`]
        >
          <v-row>
            <v-col
              cols="12"
              class="d-flex align-start"
            >
              <filter-component
                @onSearch="handleSearch"
                @onReset="handleReset"
              />
            </v-col>
          </v-row>
          <v-row class="mb-8">
            <v-col
              cols="12"
              class="d-flex align-start"
            >
              <columns-view @saveColumns="saveColumns" />
              <icon-button
                @click="handleExportMeasuresInXlsx"
                type="text"
                text="Экспорт списка"
                class="ml-4"
                icon="mdi-arrow-collapse-down"
              />
              <router-link to="/accountingBusiness/create">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonComponent from '../shared/buttons/DefaultButton.vue';
import IconButton from '../shared/buttons/IconButton.vue';
import FilterComponent from '../shared/Filter/Filter.vue';
import InputComponent from '../shared/inputs/InputComponent.vue';
import ColumnsView from '../shared/table/ColumnsView/ColumnsView.vue';
import DataTable from '../shared/table/DataTable.vue';

@Component({
  name: 'accountingBusinessList',
  components: {
    InputComponent,
    ButtonComponent,
    FilterComponent,
    DataTable,
    ColumnsView,
    IconButton,
  },
})
export default class AccountingBusinessList extends Vue {
  searchName = '';
  fields = ['name', 'dsdf', 'sdfsf'];
  get filters(): unknown {
    return {
      multiFilters: [
        {
          name: 'search',
          like: true,
          label: 'Поиск',
          names: this.fields,
          isDefault: true,
          defaultValue: '',
        },
      ],
      simpleFilters: [
        {
          defaultValue: '',
          isDefault: true,
          label: 'Наименование',
          name: 'name',
        },
      ],
    };
  }

  handleSearch() {
    console.log('handleSearch');
  }

  saveColumns() {
    console.log('saveColumns');
  }

  handleReset() {
    console.log('handleReset');
  }

  handleResetSearch() {
    console.log('handleResetSearch');
  }

  handleOpenMeasure() {
    console.log('handleOpenMeasure');
  }

  handleExportMeasuresInXlsx() {
    console.log('handleExportMeasuresInXlsx');
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
