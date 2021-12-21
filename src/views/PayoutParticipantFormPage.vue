<template>
  <main-layout
    title="Участник списка на социальную выплату"
  >
    <v-row class="mt-4">
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.queueNum"
          :disabled="true"
          label="Номер очереди"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.applicant.fullName"
          :disabled="true"
          label="ФИО"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.work.employer.shortName"
          :disabled="true"
          label="Место работы"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.work.workFunction"
          :disabled="true"
          label="Должность"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <date-picker
          :value="participantCard.deed.work.employmentDate"
          :disabled="true"
          :readonly="true"
          output-format="YYYY-MM-DDTHH:mm:SS"
          view-format="DD.MM.YYYY HH:mm"
          label="Дата приёма"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.employment.name"
          :disabled="true"
          label="Сфера занятости"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.spendingDirection.name"
          :disabled="true"
          label="Направление расходования средств"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.queuePriority.name"
          label="Приоритет"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.oktmo.name"
          label="ОКТМО"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <input-component
          :value="participantCard.personsCount"
          :disabled="true"
          label="Кол-во человек"
        />
      </v-col>
      <v-col cols="3">
        <input-component
          :value="participantCard.price"
          :disabled="true"
          label="Стоимость, 1 кв.м."
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <input-component
          :value="participantCard.deed.area"
          :disabled="true"
          label="Площадь, кв.м."
        />
      </v-col>
      <v-col
        cols="3"
        class="d-flex align-center"
      >
        <checkbox-component
          :value="participantCard.isPartAgreed"
          :disabled="true"
          label="Согласована часть средств"
        />
      </v-col>
    </v-row>
    <v-col
      cols="6"
      class="bordered"
    >
      <v-row>
        <v-col style="height: 60px;">
          Объем средств, предусмотренных на строительство (приобретение) жилья, тысяч рублей
        </v-col>
      </v-row>
      <v-row cols="6">
        <v-col cols="6">
          <input-component
            @change="(value) => changeValue('federalSum', value)"
            :value="participantCard.federalSum"
            type="number"
            :hide-spin-buttons="true"
            label="Федеральный бюджет"
          />
        </v-col>
        <v-col cols="6">
          <input-component
            @change="(value) => changeValue('regionalSum', value)"
            :value="participantCard.regionalSum"
            type="number"
            :hide-spin-buttons="true"
            label="Региональный бюджет"
          />
        </v-col>
      </v-row>
      <v-row cols="6">
        <v-col cols="6">
          <input-component
            @change="(value) => changeValue('localSum', value)"
            :value="participantCard.localSum"
            type="number"
            :hide-spin-buttons="true"
            label="Местный бюджет"
          />
        </v-col>
        <v-col cols="6">
          <input-component
            @change="(value) => changeValue('extrabudgetarySum', value)"
            :value="participantCard.extrabudgetarySum"
            type="number"
            :hide-spin-buttons="true"
            label="Внебюджетные источники"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <date-picker
          :value="participantCard.deed.registrationDate"
          :disabled="true"
          :readonly="true"
          output-format="YYYY-MM-DDTHH:mm:SS"
          view-format="DD.MM.YYYY HH:mm"
          label="Дата постановки на учёт"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="row-name"
      >
        <input-component
          :value="participantCard.deed.id"
          label="Номер учетного дела"
          :disabled="true"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <button-component
          @click="onPartialConformClick()"
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
          @click="onSaveCardClick()"
          title="Сохранить"
          size="micro"
          variant="primary"
          style="margin-right: 15px"
        />
        <button-component
          @click="onCancelCardClick()"
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

export default class PayoutParticipantFormPage extends Vue {
  store: Store = useStore(this.$store);

  deleteDialog = false

  onPartialConformClick() {
    alert('Здесь происходит магия согласования части средств');
  }

  async onSaveCardClick() {
    if (this.currentId !== 'newCard') {
      await this.store.participantCard.updateData({ id: this.currentId, type: 'payout' });
      this.$router.back();
    }
  }

  async onCancelCardClick() {
    this.$router.back();
  }

  async changeValue(field: string, value: any) {
    await this.store.participantCard.changeCardValue({ field: field, value: value });
  }

  get currentId() {
    return this.$route.params?.id || 'newCard';
  }

  get participantCard() {
    return this.store.participantCard.state?.card;
  }

  mounted() {
    if (this.currentId !== 'newCard') {
      this.store.participantCard.fetchData({ id: this.currentId, type: 'payout' });
    }
  }
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }

  .col {
    padding-bottom: 0;
    padding-top: 0;
  }

  .bordered {
    border: 1px solid black;
    border-radius: 16px;
    margin: 24px 0;
    padding: 24px 16px;
  }

  .row-name {
    padding-top: 8px;
  }

  .v-input--selection-controls.v-input--checkbox.checkbox {
    padding-left: 0;
  }
</style>
