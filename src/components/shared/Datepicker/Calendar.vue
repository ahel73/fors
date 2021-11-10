<template>
  <div
    class="calendar"
    :style="{ width }"
  >
    <section class="navigation-container">
      <button @click="prev()">
        <v-icon class="arrow">
          mdi-chevron-left
        </v-icon>
      </button>
      <div class="selects">
        <autocomplete-component
          v-if="monthSelect"
          v-model="monthValue"
          @change="monthSelectChange"
          :items="monthsList"
          class="select"
          hide-details
        />
        <autocomplete-component
          v-if="yearSelect"
          v-model="yearValue"
          @change="yearSelectChange"
          :items="numberOfYears"
          class="select"
          hide-details
        />
      </div>
      <button @click="next()">
        <v-icon class="arrow">
          mdi-chevron-right
        </v-icon>
      </button>
    </section>
    <section class="subnavigation-container">
      <div class="week-container">
        <div
          v-for="(weekday, index) in weekdays"
          class="weekday"
          :key="index"
        >
          {{ weekday }}
        </div>
      </div>
    </section>
    <section class="body-container">
      <div class="days-container">
        <!-- needs back and forward ranges -->
        <div
          v-for="(previousDay, index) in previousDaysList"
          class="day disabled"
          :key="`previousDay-${index}`"
        >
          {{ previousDay.date() }}
        </div>
        <div
          v-for="(currentDay, index) in currentDaysList"
          @click="isBeetweenLimits(currentDay) && select(currentDay)"
          :class="[
            'day',
            {
              disabled: !isBeetweenLimits(currentDay),
              selected: isActive(currentDay),
              today: isToday(currentDay),
            }
          ]"
          :key="`currentDay-${index}`"
        >
          {{ currentDay.date() }}
        </div>
        <div
          v-for="(nextDay, index) in nextDaysList"
          class="day disabled"
          :key="`nextDay-${index}`"
        >
          {{ nextDay }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import last from 'lodash/last';
import isNumber from 'lodash/isNumber';
import moment, { Moment } from 'moment';
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue';
import AutocompleteComponent from '@/components/shared/inputs/AutocompleteComponent.vue';

type DatepickerValue = string;

interface Selection {
  text: string;
  value: number;
}

@Component({
  name: 'calendar',
  components: {
    'select-component': SelectComponent, AutocompleteComponent,
  },
})
export default class Calendar extends Vue {
  @Model('change', { type: String }) readonly value!: DatepickerValue;

  @Prop({ type: String, default: 'ru' }) readonly localization!: string;
  @Prop({ type: String, default: 'YYYY-MM-DD' }) readonly format!: string;
  @Prop({ type: Boolean, default: true }) readonly yearSelect!: boolean;
  @Prop({ type: Boolean, default: true }) readonly monthSelect!: boolean;
  @Prop({ type: String, default: '260px' }) readonly width!: string;
  @Prop({ type: Number, default: 2012 }) readonly startingYear!: number;
  @Prop({ type: String, default: '' }) readonly limitFrom!: string;
  @Prop({ type: String, default: '' }) readonly limitTo!: string;

  date: Moment = moment(this.value || moment(), this.format);
  formattedValue = this.value;

  yearLimitFrom = this.limitFrom && moment(this.limitFrom).year();
  monthLimitFrom = this.limitFrom && moment(this.limitFrom).month();
  yearLimitTo = this.limitTo && moment(this.limitTo).year();
  monthLimitTo = this.limitTo && moment(this.limitTo).month();

  yearValue: number = moment().year();
  monthValue: number = moment().month();

  get numberOfYears(): number[] {
    const yearFrom = this.yearLimitFrom ?? this.startingYear;

    if (isNumber(this.yearLimitFrom) && isNumber(this.yearLimitTo)) {
      const years = new Array(this.yearLimitTo - this.yearLimitFrom + 1)
        .fill(null)
        .map((_, index) => +this.yearLimitFrom + index);

      return [
        ...years,
      ];
    }

    if (isNumber(this.yearLimitTo)) {
      const years = new Array(100)
        .fill(null)
        .map((_, index) => +this.yearLimitTo - index);

      return [
        ...years,
      ];
    }

    if (yearFrom) {
      const years = new Array(100)
        .fill(null)
        .map((_, index) => yearFrom + index);

      return [
        ...years,
      ];
    }

    return [];
  }

  get year(): number {
    return this.date.year();
  }

  get weekdays(): string[] {
    return moment.weekdaysMin();
  }

  get monthsList(): Selection[] {
    return moment().localeData().months().reduce<Selection[]>((months, monthName, monthIndex) => {
      return [...months, { text: monthName, value: monthIndex }];
    }, []);
  }

  get currentDaysList(): Moment[] {
    return new Array(this.currentDays)
      .fill(null)
      .map((_, index) => moment([this.year, this.date.month(), index + 1]));
  }

  get previousDaysList(): moment.Moment[] {
    if (this.startWeek) {
      const { date, isNewYear } = this;
      const month = date.month();

      return new Array(this.previousDays)
        .fill(null)
        .map((_, index) => moment([this.year, isNewYear ? month - 1 : month, index]))
        .slice(-this.startWeek);
    }

    return [];
  }

  get isNewYear(): boolean {
    const { date } = this;

    return date.month() > 0;
  }

  get nextDaysList(): number[] {
    return new Array(this.nextDays)
      .fill(null)
      .map((_, index) => index + 1)
      .slice(0, 7 - (this.endWeek + 1));
  }

  get previousDays(): number {
    return moment().month(this.monthValue - 1).clone().endOf('month').date();
  }

  get nextDays(): number {
    return moment().month(this.monthValue + 1).clone().endOf('month').date();
  }

  get currentDays(): number {
    return this.date.clone().endOf('month').date();
  }

  get startWeek(): number {
    return this.date.clone().startOf('month').day();
  }

  get endWeek(): number {
    return this.date.clone().endOf('month').day();
  }

  get momentLimitFrom(): Moment {
    const { limitFrom } = this;

    if (!limitFrom) {
      return moment([this.startingYear]);
    }

    return moment(limitFrom, this.format);
  }

  get momentLimitTo(): Moment {
    const { limitTo } = this;

    if (!limitTo) {
      const lastYear = last(this.numberOfYears) as number;

      return moment([lastYear]);
    }

    return moment(limitTo, this.format);
  }

  monthSelectChange(): void {
    this.date = moment([this.year, this.monthValue]);
  }

  yearSelectChange(): void {
    this.date = moment([this.yearValue, this.monthValue]);
  }

  isActive(date: Moment): boolean {
    return this.date.unix() === date.unix();
  }

  isToday(date: Moment): boolean {
    const today = moment();

    return (
      date.date() === today.date() &&
        date.year() === today.year() &&
        date.month() === today.month()
    );
  }

  isBeetweenLimits(date: Moment): boolean {
    return date.isBetween(this.momentLimitFrom, this.momentLimitTo, undefined, '[]');
  }

  next(): void {
    const edgeMonth = 11;

    const nextMonth = this.date.month() + 1;
    const month = nextMonth > edgeMonth ? 0 : nextMonth;
    const year = nextMonth > edgeMonth ? this.year + 1 : this.year;

    this.setMonthAndYear(month, year);
    this.date = moment([year, month]);
  }

  prev(): void {
    const edgeMonth = 11;

    const prevMonth = this.date.month() - 1;
    const month = prevMonth < 0 ? edgeMonth : prevMonth;
    const year = prevMonth < 0 ? this.year - 1 : this.year;

    this.setMonthAndYear(month, year);
    this.date = moment([year, month]);
  }

  select(date: Moment): void {
    this.date = date;
    this.formattedValue = this.date.format(this.format);
    this.$emit('change', this.formattedValue);
  }

  today(): void {
    this.select(moment());
    this.setMonthAndYear(this.date.month(), this.date.year());
  }

  setMonthAndYear(month: number, year: number): void {
    this.monthValue = month;
    this.yearValue = year;
  }

  created(): void {
    moment.locale(this.localization);
  }

  @Watch('value', { immediate: true })
  onValueChange(value: string): void {
    if (this.value) {
      this.yearValue = moment(value).year();
      this.monthValue = moment(value).month();
    }
  }

  @Watch('limitFrom')
  onLimitFromChange(value: Moment): void {
    this.yearLimitFrom = value && moment(value).year();
    this.monthLimitFrom = value && moment(value).month();
  }

  @Watch('limitTo')
  onLimitToChange(value: Moment): void {
    this.yearLimitTo = value && moment(value).year();
    this.monthLimitTo = value && moment(value).month();
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $background_dark: map-get($map: $theme-colors, $key: "bright");
  $dark: map-get($map: $theme-colors, $key: "dark");
  $drop_dark: transparentize($color: map-get($map: $theme-colors, $key: "dark"), $amount: .9);
  $light: map-get($map: $theme-colors, $key: "light");
  $medium: map-get($map: $theme-colors, $key: "medium");
  $primary: map-get($map: $theme-colors, $key: "primary");
  $white: map-get($map: $theme-colors, $key: "white");

  .calendar {
    background: $white;
    border: 1px solid $background_dark;
    border-radius: 4px;
    box-shadow: 0 16px 32px $drop_dark;
  }

  /* common begin */
  %text {
    font-size: 13px;
    font-weight: normal;
    line-height: 16px;
  }

  .disabled {
    color: $light;
  }

  /* common end */

  /* containers begin */
  .header-containr {
    background: #5495c5;
    color: $white;
    padding: 15px 10px;
  }

  .navigation-container {
    border-bottom: 1px solid $background_dark;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .subnavigation-container {
    border-bottom: 1px solid $background_dark;
    padding: 12px 20px;
  }

  .week-container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(7, 1fr);
  }

  .body-container {
    padding: 16px 20px;
  }

  .days-container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(7, 1fr);
  }

  /* containers end */

  /* elements begin */
  .selects {
    display: flex;
  }

  .select {

    font-size: 14px;
    margin: 0 5px;
    min-width: 60px;
    padding: 0 !important;

    @extend %text;
  }

  .select-item {
    @extend %text;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .select::v-deep .v-select__selection {

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .weekday {
    color: $medium;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;

    @extend %text;
  }

  .day {
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    height: 28px;
    justify-content: center;
    margin: 0 auto;
    width: 28px;

    @extend %text;

    &.selected {
      background-color: $primary;
      color: $white !important;
    }

    &.today {
      border: 1px solid $primary;
      color: $primary;
    }
  }

  /* elements end */
</style>
