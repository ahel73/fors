<template>
  <div>
    <v-menu
      v-model="isDialogOpened"
      :close-on-content-click="false"
      :return-value.sync="outputDate"
      content-class="content"
      bottom
      offset-y
      ref="menu"
    >
      <template #activator="{ on, attrs }">
        <div
          v-on="!readonly && on"
          v-bind="!readonly && attrs"
        >
          <input-component
            v-model="viewDate"
            :error-messages="errorMessages"
            :label="label"
            :readonly="readonly"
            :disabled="disabled"
            :required="isRequired"
            :hide-details="hideDetails"
            class="input"
            color="#d19b3f"
            variant="micro"
            clearable
            :is-error="error"
          >
            <template #append>
              <icon-component icon-color="transparent">
                <calendar-icon />
              </icon-component>
            </template>
          </input-component>
        </div>
      </template>
      <calendar
        v-model="outputDate"
        @change="handleChange"
        :format="outputFormat"
        :limit-from="limitFrom"
        :limit-to="limitTo"
        :localization="localization"
        :month-select="monthSelect"
        :year-select="yearSelect"
        :starting-year="startingYear"
        width="100%"
        hide-header
      />
    </v-menu>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import Calendar from '@/components/shared/Datepicker/Calendar.vue';
import CalendarIcon from '@/components/shared/IconComponent/icons/CalendarIcon.vue';
import IconComponent from '@/components/shared/IconComponent/IconComponent.vue';
import InputComponent from '@/components/shared/inputs/InputComponent.vue';
import LabelComponent from '@/components/shared/Label/Label.vue';

interface MenuRef extends Element {
  save: (value: string) => void;
}

/**
 * @param {string} outputFormat new Date().toISOString().substr(0, 10).
 */
@Component({
  name: 'datepicker',
  components: {
    Calendar,
    CalendarIcon,
    IconComponent,
    InputComponent,
    LabelComponent,
  },
})
export default class Datepicker extends Vue {
  @Model('change', { type: String }) readonly value!: string;

  @Prop({ type: [String, Array], default: '' }) errorMessages!: string | string[];
  @Prop({ type: String, default: 'Укажите дату' }) readonly placeholder!: string;
  @Prop({ type: String, default: 'ru' }) readonly localization!: string;
  @Prop({ type: String, default: 'YYYY-MM-DD' }) readonly outputFormat!: string;
  @Prop({ type: String, default: 'DD-MM-YYYY' }) readonly viewFormat!: string;
  @Prop({ type: Boolean, default: true }) readonly yearSelect!: boolean;
  @Prop({ type: Boolean, default: true }) readonly monthSelect!: boolean;
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean;
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String, default: '' }) readonly limitFrom!: string;
  @Prop({ type: String, default: '' }) readonly limitTo!: string;
  @Prop(String) readonly label!: string;
  @Prop(Boolean) readonly isRequired!: boolean;
  @Prop(Number) readonly startingYear!: number;
  @Prop(Boolean) readonly hideDetails!: boolean;

  @Prop({ type: Boolean, default: false }) readonly error!: boolean;

  isDialogOpened = false;

  get outputDate(): string {
    return this.value;
  }

  set outputDate(outputDate: string) {
    this.$emit('change', outputDate);
  }

  get viewDate(): string {
    const { outputFormat, value, viewFormat } = this;
    const outputDate = moment(value, outputFormat);

    return outputDate.isValid() ? outputDate.format(viewFormat) : '';
  }

  set viewDate(viewDate: string) {
    this.$emit('change', viewDate);
  }

  handleChange(outputDate: string): void {
    (this.$refs.menu as MenuRef).save(outputDate);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $medium: map-get($map: $theme-colors, $key: "medium");

  .input::v-deep .v-input__slot {
    color: $medium;
    font-size: 14px;
    line-height: 16px;
    padding: 0 14px !important;
  }

  .input::v-deep .v-label {

    &--active {
      display: none;
    }
  }

  .input::v-deep fieldset legend {
    width: 0 !important;
  }
</style>
