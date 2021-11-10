import { Filter } from '@/components/shared/Filter/Filter.types';
import { FilterTypeNames, ValueTypes } from '@/components/shared/Filter/types';

export type SimpleRangeValueTypes = ValueTypes.NUMBER | ValueTypes.STRING;

interface SimpleRangeItem {
    name: string;
    value: string | null;
}

export interface SimpleRangeValue {
    from: SimpleRangeItem;
    label: string;
    name: string;
    to: SimpleRangeItem;
    value?: string;
    type: FilterTypeNames.RANGE_SIMPLE_FILTER;
    valueType: SimpleRangeValueTypes;
}

export interface RangeSimpleModel {
    [key: string]: SimpleRangeValue;
}

export interface SimpleFilter extends Filter {
    defaultValue?: string | null;
    type?: FilterTypeNames.SIMPLE_FILTER;
}

export interface RangeSimpleFilter extends Filter {
    from: SimpleFilter;
    to: SimpleFilter;
    type: FilterTypeNames.RANGE_SIMPLE_FILTER;
    valueType: SimpleRangeValueTypes;
}
