import { Filter } from '@/components/shared/Filter/Filter.types';
import { FilterTypeNames, ValueTypes } from '@/components/shared/Filter/types';

export type SimpleValueTypes = ValueTypes.NUMBER | ValueTypes.STRING;

export interface SimpleValue {
    name: string;
    text: string;
    type: FilterTypeNames.SIMPLE_FILTER;
    value: string | null;
    valueType: SimpleValueTypes;
}

export interface SimpleModel {
    [key: string]: SimpleValue;
}

export interface SimpleFilter extends Filter {
    defaultValue?: string | null;
    type: FilterTypeNames.SIMPLE_FILTER;
    valueType: SimpleValueTypes;
}
