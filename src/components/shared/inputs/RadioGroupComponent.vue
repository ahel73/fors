<template>
  <v-radio-group
    v-model="innerValue"
    :row="row"
    :column="column"
    :hide-details="hideDetails"
    :disabled="disabled"
  >
    <v-radio
      :label="innerLabelYes"
      :value="valueYes"
    >
      <template
        v-if="labelYes"
        #label
      >
        <label-component
          :label="labelYes"
          :show-icon="isRequired"
        />
      </template>
    </v-radio>
    <v-radio
      :label="innerLabelNo"
      :value="valueNo"
    >
      <template
        v-if="labelNo"
        #label
      >
        <label-component
          :label="labelNo"
          :show-icon="isRequired"
        />
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import TextComponent from '@/components/shared/Text/Text.vue';
import LabelComponent from '@/components/shared/Label/Label.vue';

type Value = boolean | string | number;

@Component({
  name: 'radio-group-component',
  components: {
    LabelComponent,
    TextComponent,
  },
})
export default class RadioGroupComponent extends Vue {
  @Model('change', { type: [Boolean, String, Number], default: false }) readonly value!: Value;

  @Prop({ type: [Boolean, String, Number], default: true }) readonly valueYes!: string;
  @Prop({ type: [Boolean, String, Number], default: false }) readonly valueNo!: string;
  @Prop({ type: Boolean, default: true }) readonly row!: string;
  @Prop({ type: Boolean, default: false }) readonly column!: string;

  @Prop(Boolean) readonly disabled!: boolean;
  @Prop(Boolean) readonly isRequired!: boolean;
  @Prop(String) readonly innerLabelYes!: string;
  @Prop(String) readonly innerLabelNo!: string;
  @Prop(String) readonly labelYes!: string;
  @Prop(String) readonly labelNo!: string;
  @Prop(Boolean) readonly hideDetails!: boolean;
  @Prop(Function) readonly onClick!: () => void;

  get innerValue(): Value {
    return this.value;
  }

  set innerValue(value: Value) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/_variables.scss";

  .v-input--selection-controls {
    margin: 0;
    padding: 0;
  }

  .v-application .primary--text {
    caret-color: #333 !important;
    color: #333 !important;
  }
</style>
