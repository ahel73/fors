<template>
  <main-layout
    :title="mainLayoutText"
  >
    <v-row>
      <v-col>
        <data-table
          :headers="headers"
          :items="participants"
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
                      v-model="region"
                      variant="micro"
                      label="Муниципальный район"
                      :items="regions"
                      item-text="name"
                      return-object
                    />
                  </v-col>
                  <v-col cols="4">
                    <select-component
                      v-model="year"
                      variant="micro"
                      label="Финансовый год"
                      :items="years"
                    />
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                  <button-component
                    @click="onAcceptSearchClick()"
                    title="Применить"
                    size="micro"
                    variant="primary"
                    style="margin-right: 15px"
                  />
                  <button-component
                    @click="onCancelSearchClick()"
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
                  v-if="userLevel === 'MSH'"
                  @click.prevent.native="onConsolidateClick()"
                  class="ml-3"
                  type="text"
                  icon="mdi-plus-circle"
                  text="Сформировать свод"
                />
              </v-col>
            </v-row>
          </template>
          <template #[`item.deedWorkEmployerShortNameWithFunc`]="{ item }">
            {{ getDeedWorkString(item) }}
          </template>
          <template #[`item.registrationDate`]="{ item }">
            {{ getRegistrationDate(item.deedRegistrationDate) }}
          </template>
          <template #[`item.actions`]="{ item: { id } }">
            <div class="d-flex justify-center flex-nowrap">
              <span class="table-action__wrapper">
                <base-action
                  @click="onEditClick(id)"
                  hint="Смотреть"
                >
                  <template #customIcon>
                    <v-icon>
                      mdi-eye
                    </v-icon>
                  </template>
                </base-action>
              </span>
            </div>
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row v-if="userLevel === 'MSH'">
      <button-component
        @click.prevent.native="onConformClick()"
        title="Согласовать"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
      <button-component
        v-if="false"
        title="Добавить вакансию"
        size="micro"
        variant="primary"
        style="margin-right: 15px"
      />
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import moment from 'moment';
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
import BaseAction from '@/components/shared/table/RowActions/BaseAction.vue';
import { TableHeaders } from '@/components/shared/table/DataTable.types';
import { FilterTypes } from '@/components/shared/Filter/types';
import { OutputFilters } from '@/components/shared/Filter/FilterTypes/types';
import eventBus from '@/utils/bus/event-bus';
import { WorkingRegion } from '@/types';

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
    BaseAction,
  },
})

export default class ParticipantsListPage extends Vue {
  store: Store = useStore(this.$store);

  items: OutputFilters = [];
  size: string | number = 10;
  page: string | number = 0;
  sort: string | undefined = '-id';
  initialSort: string | undefined = '-id';

  year: number | null = null;
  region = null;

  columns: Columns<unknown>[] = [
    { isDefault: true, text: '№ очереди', value: 'queueNum', sortable: false },
    { isDefault: true, text: 'Фамилия Имя Отчество', value: 'deedApplicantFullName', sortable: false },
    { isDefault: true, text: 'Место работы, должность', value: 'deedWorkEmployerShortNameWithFunc', sortable: false },
    { isDefault: true, text: 'Сфера занятости', value: 'deedEmploymentName', sortable: false },
    { isDefault: true, text: 'Направление расходования средств', value: 'deedSpendingDirectionName', sortable: false },
    { isDefault: true, text: 'Приоритет', value: 'deedQueuePriorityName', sortable: false },
    { isDefault: true, text: 'Дата постановки на учёт', value: 'registrationDate', sortable: false },
    { isDefault: true, text: 'Тестовое значение', value: 'budgets', sortable: false },
    {
      isDefault: true,
      value: 'actions',
      text: 'Действия',
      sortable: false,
      isVisible: false,
      isEditable: false,
      align: 'center',
    },
  ]

  get filters(): FilterTypes {
    return {
    };
  }

  headers: TableHeaders[] = []

  get mainLayoutText() {
    return `Список участников "${this.currentImprovingWay?.name}" ${this.processedYear}`;
  }

  get currentImprovingWay() {
    try {
      return this.store.participants.state?.improvingWays.find((item: WorkingRegion) => item.id === this.currentId);
    } catch {
      return { id: 0, name: '', code: '' };
    }
  }

  get currentId() {
    return this.$route.query && this.$route.query.id
      ? +this.$route.query.id
      : 0;
  }

  get processedYear() {
    if (!this.store.participants.state.financialYear) return '';
    return 'за ' + this.store.participants.state.financialYear + ' год';
  }

  get regions() {
    return this.store.participants.state?.regions;
  }

  get years() {
    return this.store.participants.state?.financialYears;
  }

  get participants() {
    return this.store.participants.state?.items;
  }

  get userLevel() {
    return this.store.me.state?.data?.level || 'default';
  }

  getDeedWorkString(item: any) {
    if (!item.deedWorkEmployerShortName || !item.deedWorkFunc) return '';
    return item.deedWorkEmployerShortName + ', ' + item.deedWorkFunc;
  }

  getRegistrationDate(item: string) {
    return moment(item).format('DD.MM.YYYY HH:mm');
  }

  mounted() {
    this.store.participants.fetchImprovingWays().then((improvingWay) => {
      this.store.participants.fetchMembers({ size: this.size.toString(), sort: this.sort, page: this.page.toString() });
      this.store.participants.fetchRegions();
      this.store.participants.fetchYears();
      this.store.me.fetchMe();
    });
  }

  handleSearch(outputFilters: OutputFilters): void {
    this.items = outputFilters;
    console.log(outputFilters);
  }

  handleReset(): void {
    this.items = [];
  }

  saveColumns(): void {
    const data = { columns: this.columns, sort: this.sort, items: this.items };
    console.log(data);
  }

  onAcceptSearchClick() {
    this.store.participants.setSearch(this.year, this.region);
  }

  onCancelSearchClick() {
    this.region = null;
    this.year = null;
  }

  onConsolidateClick() {
    if (this.currentImprovingWay) {
      this.store.participants.createSummaryList({ improvingWay: this.currentImprovingWay, financialYear: this.year, regionCode: this.region });
    }
  }

  onConformClick() {
    if (this.currentImprovingWay) {
      this.store.participants.conformMembers({ improvingWay: this.currentImprovingWay, financialYear: this.year, areaCode: this.region });
    }
  }

  onEditClick(id: number) {
    this.$router.push({ name: 'PayoutParticipantFormPage', params: { id: id.toString() } });
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
