import { Filter } from '@/components/shared/Filter/Filter.types';
import { FilterTypeNames, ValueTypes } from '@/components/shared/Filter/types';

export type MultiValueTypes = ValueTypes.NUMBER | ValueTypes.STRING;

export interface MultiValue {
    name: string;
    names: string[];
    text: string;
    type: FilterTypeNames.MULTI_FILTER;
    value: string | null;
    valueType: MultiValueTypes;
}

export interface MultiModel {
    [key: string]: MultiValue;
}

export interface MultiFilter extends Filter {
    defaultValue?: string | null;
    name: string;
    names: string[];
    type: FilterTypeNames.MULTI_FILTER;
    valueType: MultiValueTypes;
}
