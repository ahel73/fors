<template>
  <div class="wrapper">
    <header class="mb-3">
      <text-component
        v-if="title"
        variant="h4"
      >
        {{ title }}
      </text-component>
      <text-component
        v-if="subtitle"
        class="mt-5"
        variant="h5"
      >
        {{ subtitle }}
      </text-component>
    </header>
    <main>
      <slot />
    </main>
    <footer :class="['actions d-flex', controlsAlign, controlsJustify]">
      <button-component
        v-if="canGoBack"
        @click="handleGoBack"
        size="micro"
        title="Назад"
        variant="primary"
      />
      <slot name="actions" />
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import TextComponent from '@/components/shared/Text/Text.vue';

type AlignVariants = 'align-end' | 'align-center' | 'align-end';

type JustifyVariants = 'justify-start' | 'justify-center' | 'justify-end';

@Component({
  name: 'detail-page-layout',
  components: {
    ButtonComponent,
    TextComponent,
  },
})
export default class DetailPageLayout extends Vue {
  @Prop({ type: String, default: 'align-center' }) readonly controlsAlign!: AlignVariants;
  @Prop({ type: String, default: 'justify-end' }) readonly controlsJustify!: JustifyVariants;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly subtitle!: string;

  canGoBack = true;

  handleGoBack(): void {
    this.$router.back();
  }

  mounted(): void {
    const isNewTab = window.history.length === 1;

    if (isNewTab) {
      this.canGoBack = false;
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";

  .wrapper {
    padding: 32px 30px;
    width: 100%;
  }

  .actions {

    & > *:not(:first-child) {
      margin-left: 20px;
    }
  }
</style>
