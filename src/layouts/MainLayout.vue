<template>
  <div class="main">
    <div class="mb-3">
      <text-component
        v-if="title"
        variant="h4"
      >
        {{ title }}
        <slot name="after-title" />
      </text-component>
      <text-component
        v-if="subtitle"
        class="mt-5"
        variant="h5"
      >
        {{ subtitle }}
        <slot name="after-subtitle" />
      </text-component>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextComponent from '@/components/shared/Text/Text.vue';

export default Vue.extend({
  name: 'MainLayout',
  components: {
    TextComponent,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
});
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $primary: map-get($map: $theme-colors, $key: "primary");
  $medium: map-get($map: $theme-colors, $key: "medium");

  .v-breadcrumbs::v-deep li a {
    color: $medium;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
  }

  .v-breadcrumbs::v-deep li:first-child a {
    color: $primary;
  }

  .v-breadcrumbs::v-deep li:nth-child(even) {
    padding: 0 8px;
  }
</style>
