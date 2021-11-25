<template>
  <main-layout
    :title="getMainText"
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
                class="d-flex justify-end"
              >
                <v-row>
                  <v-col>
                    Финансовый год
                    <select-component
                      :items="[1,2,3]"
                    />
                  </v-col>
                  <v-col>
                    Регион
                    <select-component
                      :items="[1,2,3]"
                    />
                  </v-col>
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
                  text="Добавить"
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
      />
      <button-component
        title="Добавить вакансию"
      />
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { participants } from '@/store/modules/participants';
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

export default class ParticipantsListPage extends Vue {
  participantsContext = participants.context(this.$store);

  itemIdToDelete: number | null = null;
  deleteDialog = false

  get getMainText() {
    return `${this.participantsContext.}`;
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
