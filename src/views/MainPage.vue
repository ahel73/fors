<template>
  <main-layout
    title="Заголовок главной страницы"
  >
    Hello world!
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import MainLayout from '@/layouts/MainLayout.vue';

@Component({
  name: 'ProgramsRegistry',
  components: {
    MainLayout,
  },
})

export default class ProgramsRegistryPage extends Vue {
  store: Store = useStore(this.$store);

  itemIdToDelete: number | null = null;
  deleteDialog = false
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
