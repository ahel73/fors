<template>
  <div class="d-flex">
    <menu-component
      v-model="isDialogOpen"
      :absolute="false"
      :attach="false"
      :close-on-content-click="false"
      :menu-top-offset="-20"
      :show-controls="false"
      :show-overlay="false"
      min-width="250px"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="filters.length"
          v-on="on"
          v-bind="attrs"
          :ripple="false"
          class="button add-button mr-6"
          depressed
        >
          <v-icon left>
            mdi-plus-circle
          </v-icon>
          Добавить поле
        </v-btn>
      </template>
      <template #content>
        <div
          v-if="filters.length"
          class="py-5"
        >
          <checkbox-component
            v-for="filter in filters"
            v-model="models[filter.name]"
            @change="handleChoose"
            :label="filter.label"
            hide-details
            highlight-on-hover
            :key="filter.name"
          />
        </div>
        <template v-else>
          <div class="text-center py-2">
            Фильтры не найдены
          </div>
        </template>
      </template>
    </menu-component>
    <v-btn
      @click="handleReset"
      :ripple="false"
      class="button restore-button"
      depressed
    >
      Вернуть поля по умолчанию
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FlattenedFilter } from '@/components/shared/Filter/types';
import { Models } from './FilterCustomizer.types';
import CheckboxComponent from '@/components/shared/inputs/CheckboxComponent.vue';
import Filters from '@/components/shared/Filter/Filters/Filters.vue';
import MenuComponent from '@/components/shared/Menu/Menu.vue';

@Component({
  name: 'filter-customizer',
  components: {
    CheckboxComponent,
    Filters,
    MenuComponent,
  },
})
export default class FilterCustomizer extends Vue {
  @Prop(Array) filters!: FlattenedFilter[];
  @Prop(Function) onChoose!: (models: Models) => void;
  @Prop(Function) onRestoreDefault!: () => void;

  isDialogOpen = false;
  models: Models = {};

  handleReset(): void {
    this.onRestoreDefault();
  }

  handleChoose(): void {
    this.onChoose(this.models);
  }

  setModels(): void {
    for (const filter of this.filters) {
      const { isDefault = false, name } = filter;

      Vue.set(this.models, name as string, isDefault);
    }
  }

  mounted(): void {
    this.setModels();
  }

  @Watch('filters')
  onFiltersChange(): void {
    this.setModels();
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  %button {
    background-color: transparent !important;
    height: auto !important;
    padding: 6px 12px !important;
    text-transform: none;

    &:focus,
    &:hover {
      background-color: transparent !important;
    }
  }

  .add-button {
    color: map-get($map: $theme-colors, $key: "primary") !important;

    @extend %button;
  }

  .restore-button {
    color: map-get($map: $theme-colors, $key: "light") !important;

    @extend %button;
  }
</style>
