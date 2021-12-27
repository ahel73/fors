<template>
  <main-layout
    title="Список физических лиц"
  >
    <v-row>
      <v-col>
        <data-table
          @onOptionsChange="changePagAndSort"
          :headers="headers"
          :items="listPeople"
          :items-length="pagAndSort.total"
          :per-page="pagAndSort.size"
          :sort-by="pagAndSort.sort"
        >
          <!-- Фильтр и кнопки -->
          <template #[`tabs.after`]>
            <v-row>
              <v-col
                class="d-flex align-start"
              >
                <filter-component
                  @onSearch="sendFilter"
                  @onReset="resetFilter"
                  :initial-items="itemsFilter"
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
              @click="onOpenClick(item, '/individual-persons/')"
              hint="Просмотр"
            >
              <eye-icon />
            </base-action>
            <base-action
              @click="onEditClick(item, '/individual-persons/')"
              hint="Редактировать"
            >
              <edit-icon />
            </base-action>
            <base-action
              @click=" onDeleteClick(item)"
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
import { cloneDeep } from 'lodash';
import { OutputFilters } from '@/components/shared/Filter/FilterTypes/types';
import { FilterTypeNames, FilterTypes, ValueTypes } from '@/components/shared/Filter/types';

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
  get listPeople() {
    return this.store.peopleInNeety.state.listPeopleInNeety;
  }

  itemsFilter: OutputFilters = [];
  filters: FilterTypes = {
    simpleFilters: [
      {
        name: 'surname',
        label: 'Фамилия',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'name',
        label: 'Имя',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'patronymic',
        label: 'Отчество',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'inn',
        label: 'ИНН',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'snils',
        label: 'СНИЛС ',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'residence',
        label: 'Место жительства',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
      {
        name: 'location',
        label: 'Место прибывания',
        type: FilterTypeNames.SIMPLE_FILTER,
        valueType: ValueTypes.STRING,
        isDefault: true,
      },
    ],
    rangeDateFilters: [
      {
        from: {
          type: FilterTypeNames.SIMPLE_FILTER,
          name: 'from',
          value: null,
          label: 'от:',
        },
        to: {
          type: FilterTypeNames.SIMPLE_FILTER,
          name: 'to',
          value: null,
          label: 'до:',
        },
        name: 'birthDate',
        type: FilterTypeNames.RANGE_DATE_FILTER,
        label: 'Дата рождения',
        isDefault: true,
      },
    ],
  }

  filter = {
    surname: null,
    name: null,
    patronymic: null,
    fromBirthDate: null,
    toBirthDate: null,
    inn: null,
    snils: null,
    residence: null,
    location: null,
  };

  sendFilter(outputFilters: OutputFilters): void {
    outputFilters.forEach(el => {
      if (el.name === 'surname') {
        this.filter.surname = el.value[0] || null;
      } else if (el.name === 'name') {
        this.filter.name = el.value[0] || null;
      } else if (el.name === 'patronymic') {
        this.filter.patronymic = el.value[0] || null;
      } else if (el.name === 'birthDate') {
        this.filter.fromBirthDate = el.valueFrom ? el.valueFrom[0] : null;
        this.filter.toBirthDate = el.valueTo ? el.valueTo[0] : null;
      } else if (el.name === 'inn') {
        this.filter.inn = el.value[0] || null;
      } else if (el.name === 'snils') {
        this.filter.snils = el.value[0] || null;
      } else if (el.name === 'residence') {
        this.filter.residence = el.value[0] || null;
      } else if (el.name === 'location') {
        this.filter.location = el.value[0] || null;
      }
    });
    this.getGroupFind('/individual-persons/find/', this.pagAndSort, this.filter)
      .then(user => {
        this.pagAndSort.total = user.meta.total;
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });
  }

  resetFilter(): void {
    for (const prop in this.filter) {
      this.filter[prop] = null;
    }
  }

  pagAndSort = {
    page: 0,
    size: 10,
    sort: '-id',
    total: null,
  }

  changePagAndSort(options) {
    let { page, size, sort } = options;

    if (sort[1] === '-') {
      sort = sort.slice(1);
    }
    this.pagAndSort.sort = sort || this.pagAndSort.sort;
    this.pagAndSort.size = size;
    this.pagAndSort.page = page;

    this.getGroupFind('/individual-persons/find/', this.pagAndSort, this.filter)
      .then(user => {
        this.pagAndSort.total = user.meta.total;
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });
  }

  columns = [] // В этот массив добавляются колонки для отображенияи скрытия
  push = methods.push;
  getOne = methods.getOne;
  getGroupFind = methods.getGroupFind;
  dispathDeleteObject = methods.dispathDeleteObject;
  errorDispatch = methods.errorDispatch.bind(this);

  async onDeleteClick(item: object) {
    // const data = await httpClient.delete(`/individual-persons/${item.id}`);
    await this.dispathDeleteObject(item.id)
      .then(response => {
        console.log(response);
        this.getGroupFind('/individual-persons/find/')
          .then(user => {
            this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
          });
      })
      .catch(error => {
        error.then(r => {
          const objResp = JSON.parse(r);
          this.errorDispatch(objResp.message);
        });
      });
  }

  async onEditClick(item, string) {
    await this.getOne(string, item.id)
      .then(item => {
        this.store.peopleInNeety.activeUpdateItem(item);
        this.push('FormAddNewPeopleInNeety');
      })
      .catch(error => {
        this.errorDispatch(error);
      });
  }

  async onOpenClick(item, string) {
    try {
      await this.getOne(string, item.id)
        .then(item => {
          this.store.peopleInNeety.viewing(item);
          this.push('FormAddNewPeopleInNeety');
        });
    } catch (error) {
      this.errorDispatch(error.response.data.message);
    }
  }

  saveColumns(): void {
    const data = { columns: this.columns, sort: this.sort, items: this.items };
    // saveRegistrySettings({ data: data, registry: RegistryType.PROGRAMS });
  }

  setColumns() {
    return this.headers.map(obj => {
      const newObj = cloneDeep(obj);
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

    this.getGroupFind('/individual-persons/find/', this.pagAndSort, this.filter)
      .then(user => {
        this.pagAndSort.total = user.meta.total;
        this.store.peopleInNeety.updatelistPeopleInNeety(user.data);
      });

    this.columns = this.setColumns();
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
