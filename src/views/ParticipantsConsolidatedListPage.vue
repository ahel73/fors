<template>
  <main-layout
    :title="mainLayoutText"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="headers"
          :items="items"
        >
          <template #[`tabs.after`]>
            <v-row>
              <v-col
                cols="8"
                class="d-flex align-end"
              >
                <filter-component
                  @onSearch="handleSearch"
                  @onReset="handleReset"
                  :initial-items="items"
                  :filters="filters"
                />
              </v-col>
              <v-col
                cols="4"
                class="d-flex flex-column justify-end"
              >
                <v-row>
                  <v-col cols="8">
                    <select-component
                      variant="micro"
                      label="Субъект"
                      :items="[1, 2, 3]"
                    />
                  </v-col>
                  <v-col cols="4">
                    <select-component
                      variant="micro"
                      label="Финансовый год"
                      :items="[1,2,3]"
                    />
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                  <button-component
                    title="Применить"
                    size="micro"
                    variant="primary"
                    style="margin-right: 15px"
                  />
                  <button-component
                    title="Отменить"
                    size="micro"
                    style="margin-right: 15px"
                  />
                </v-row>
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
                  @click.prevent.native="onDownloadClick()"
                  type="text"
                  text="Экспорт списка"
                  class="ml-4"
                >
                  <template #prependIcon>
                    <icon-component
                      :width="18"
                      :height="18"
                    >
                      <download-icon />
                    </icon-component>
                  </template>
                </icon-button>
                <icon-button
                  @click.prevent.native="onAddClick()"
                  class="ml-3"
                  type="text"
                  icon="mdi-plus-circle"
                  text="Загрузить список"
                />
              </v-col>
            </v-row>
          </template>
          <template #[`header.budgets`]="{ item }">
            {{ item }}
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row>
      <button-component
        title="Исключить участника"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Добавить участника"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Перевести в другой список"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="На доработку"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Утвердить"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
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
import { Columns } from '@/components/shared/table/ColumnsView/ColumnsView';
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import DownloadIcon from '@/components/shared/IconComponent/icons/DownloadIcon.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { TableHeaders } from '@/components/shared/table/DataTable.types';

@Component({
  name: 'ParticipantsList',
  components: {
    MainLayout,
    DataTable,
    ColumnsView,
    FilterComponent,
    SelectComponent,
    IconButton,
    IconComponent,
    DownloadIcon,
    ButtonComponent,
  },
})

export default class ParticipantsConsolidatedListPage extends Vue {
  store: Store = useStore(this.$store);
  deleteDialog = false

  headers: TableHeaders[] = [];

  columns: Columns[] = [
    { isDefault: true, text: '№ очереди', value: 'queueNum', sortable: false },
    { isDefault: true, text: 'Фамилия Имя Отчество', value: 'fio', sortable: false },
    { isDefault: true, text: 'Место работы, должность', value: 'position', sortable: false },
    { isDefault: true, text: 'Сфера занятости', value: 'workPlace', sortable: false },
    { isDefault: true, text: 'Направление расходования средств', value: 'spendingDirectionId', sortable: false },
    { isDefault: true, text: 'Приоритет', value: 'queuePriorityId', sortable: false },
    { isDefault: true, text: 'Дата постановки на учёт', value: 'resigtrationDate', sortable: false },
    { isDefault: true, text: 'Тестовое значение', value: 'budgets', sortable: false },
  ]

  get mainLayoutText() {
    return `Сводный список участников ${this.currentType}`;
  }

  get currentType() {
    return this.$route.query ? this.$route.query.type : 'Тест';
  }

  get regions() {
    return this.store.participants.state?.regions;
  }

  get items() {
    return this.store.participantsConsolidated.state?.items;
  }

  mounted() {
    // this.store.participants.fetchRegions();
    this.store.participantsConsolidated.fetchItems({});
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
