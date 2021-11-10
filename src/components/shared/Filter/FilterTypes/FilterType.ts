import { InputTypes } from './FilterType.types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ValueTypes } from '@/components/shared/Filter/types';

@Component
export default class FilterType extends Vue {
  @Prop(({ type: Boolean, default: false })) readonly negative!: boolean;
  @Prop(({ type: Boolean, default: false })) readonly like!: boolean;
  @Prop(Boolean) readonly deletable!: boolean;
  @Prop(String) readonly label!: string;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly placeholder!: string;
  @Prop(String) readonly type!: string;
  @Prop(String) readonly valueType!: ValueTypes;

  get isNumberType(): boolean {
    return this.valueType === ValueTypes.NUMBER;
  }

  get isStringType(): boolean {
    return this.valueType === ValueTypes.STRING;
  }

  get inputType(): InputTypes {
    return this.isNumberType ? 'number' : 'string';
  }

  handleRemove(): void {
    this.$emit('onRemove', this.name);
  }
}
