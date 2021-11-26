<template>
  <main-layout
    title="Участник списка на договор найма"
  >
    <v-row>
      <v-col>
        Номер очереди:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        ФИО:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Место работы:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Должность:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Дата приёма:
      </v-col>
      <v-col>
        <date-picker />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Сфера занятости:
      </v-col>
      <v-col>
        <select-component :items="[1, 2, 3]" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        ОКТМО:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            Вакансия:
          </v-col><v-col>
            <checkbox-component />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            Стоимость, 1 кв.м.:
          </v-col>
          <v-col>
            <input-component :disabled="true" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            Кол-во человек:
          </v-col><v-col>
            <input-component />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            Площадь, кв.м.:
          </v-col><v-col>
            <input-component />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="height: 60px;">
        Объем средств, предусмотренных на строительство (приобретение) жилья, тысяч рублей
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            Федеральный бюджет:
          </v-col><v-col>
            <input-component :disabled="true" />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            Региональный бюджет:
          </v-col><v-col>
            <checkbox-component />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            Местный бюджет:
          </v-col><v-col>
            <input-component :disabled="true" />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            Внебюджетные источники:
          </v-col><v-col>
            <checkbox-component />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Дата постановки на учёт:
      </v-col>
      <v-col>
        <input-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Номер учетного дела:
      </v-col>
      <v-col>
        <input-component :disabled="true" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <button-component
          title="Согласовать часть средств"
          size="micro"
          variant="primary"
          style="margin-right: 15px"
        />
      </v-col>
      <v-col
        cols="2"
        class="d-flex justify-end"
      >
        <button-component
          title="Сохранить"
          size="micro"
          variant="primary"
          style="margin-right: 15px"
        />
        <button-component
          title="Отменить"
          size="micro"
        />
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
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import DatePicker from '@/components/shared/Datepicker/Datepicker.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import DownloadIcon from '@/components/shared/IconComponent/icons/DownloadIcon.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { TableHeaders } from '@/components/shared/table/DataTable.types';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';

@Component({
  name: 'ParticipantsList',
  components: {
    MainLayout,
    DataTable,
    ColumnsView,
    FilterComponent,
    SelectComponent,
    InputComponent,
    DatePicker,
    IconButton,
    IconComponent,
    DownloadIcon,
    ButtonComponent,
    CheckboxComponent,
  },
})

export default class HiringParticipantFormPage extends Vue {
  store: Store = useStore(this.$store);

  itemIdToDelete: number | null = null;
  deleteDialog = false

  headers: TableHeaders[] = []

  get mainLayoutText() {
    return `Сводный список участников ${this.itemIdToDelete}`;
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

  .col {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
