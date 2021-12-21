<template>
  <div class="accountingBusiness">
    <accountingBusiness-list v-if="$route.path === '/accounting-business'" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountingBusinessList from '@/components/AccountingBusiness/AccountingBusinessList.vue';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';

@Component({
  name: 'accountingBusiness',
  components: {
    AccountingBusinessList,
  },
})

export default class AccountingBusiness extends Vue {
  store: Store = useStore(this.$store);

  itemIdToDelete: number | null = null;
  deleteDialog = false;
}
</script>

<style scoped lang="scss">
  .table-action__wrapper {
    width: 28px;
  }
</style>
