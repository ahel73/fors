<template>
  <v-menu
    content-class="dialog"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <button-component
        v-on="on"
        @click="handleClick"
        v-bind="attrs"
        :append-icon="appendIcon"
        :depressed="depressed"
        :disabled="disabled"
        :prepend-icon="prependIcon"
        :size="size"
        :title="title"
        :type="type"
        :variant="variant"
        :width="width"
        class="button dropdown-button"
      />
    </template>
    <v-list>
      <slot />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ButtonComponent from './DefaultButton.vue';

@Component({
  name: 'dropdown-button',
  components: {
    ButtonComponent,
  },
})
export default class DropDownButton extends ButtonComponent {
  handleClick(event: Event): void {
    this.$emit('click', event);
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  $white: map-get($map: $theme-colors, $key: "white");

  .dialog {
    background: $white;
  }
</style>
