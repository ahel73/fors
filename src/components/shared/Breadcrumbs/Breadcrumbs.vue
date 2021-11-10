<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BreadcrumbItem } from './Breadcrumbs.types';

@Component({
  props: ['route'],
  name: 'breadcrumbs-component',
  components: {
  },
})
export default class Breadcrumbs extends Vue {
  get breadcrumbs(): BreadcrumbItem[] {
    return [
      {
        text: 'Главная',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Лизинг',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Реестр программ льготного лизинга',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ];
  }
}
</script>
