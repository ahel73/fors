<template>
  <div class="list-header">
    <filter-component />
    <template v-if="actionsHeader">
      <icon-button
        v-for="item in actionsHeader"
        @click="item.click()"
        :type="item.text"
        :text="item.text"
        :class="item.class"
        :icon="item.icon"
        :key="item.text"
      />
    </template>
  </div>
</template>
<script lang="ts">
import FilterComponent from '@/components/shared/Filter/Filter.vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';

export default {
  components: {
    FilterComponent,
    IconButton,
  },
  props: {
    actionsHeader: {
      type: [Array, Boolean],
      default: false,
    },
  },
};
</script>
