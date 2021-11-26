<template>
  <main-layout
    :title="mainLayoutText"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="headers"
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
                      label="Муниципальный район"
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
                  text="Сформировать свод"
                />
              </v-col>
            </v-row>
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row>
      <button-component
        title="Согласовать"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        title="Добавить вакансию"
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

  itemIdToDelete: number | null = null;
  deleteDialog = false

  headers: TableHeaders[] = []

  get mainLayoutText() {
    return `Список участников ${this.itemIdToDelete}`;
  }

  get regions() {
    return this.store.participants.state?.regions;
  }

  mounted() {
    // this.store.participants.fetchRegions();
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
