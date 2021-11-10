import { Filter } from '@/components/shared/Filter/Filter.types';
import { ValueTypes, FilterTypeNames } from '@/components/shared/Filter/types';

export type CheckboxSimpleValueTypes = ValueTypes.BOOL;

export interface CheckboxSimpleValue {
    name: string;
    text: string;
    type: FilterTypeNames.CHECKBOX_SIMPLE_FILTER;
    value: boolean | null;
    valueType: CheckboxSimpleValueTypes;
}

export interface CheckboxSimpleModel {
    [key: string]: CheckboxSimpleValue;
}

export interface CheckboxSimpleFilter extends Filter {
    defaultValue?: boolean | null;
    type: FilterTypeNames.CHECKBOX_SIMPLE_FILTER;
    valueType: CheckboxSimpleValueTypes;
}
