import { Filter } from '@/components/shared/Filter/Filter.types';
import { FilterTypeNames, ValueTypes } from '@/components/shared/Filter/types';

export type MultiValueTypes = ValueTypes.DATE;

interface RangeDateItem {
    name: string;
    value: string | null;
}

export interface RangeDateValue {
    value?: string;
    from: RangeDateItem;
    label: string;
    name: string;
    to: RangeDateItem;
    type: FilterTypeNames.RANGE_DATE_FILTER;
    valueType: MultiValueTypes;
}

export interface RangeDateModel {
    [key: string]: RangeDateValue;
}

export interface DateFilter extends Filter {
    defaultValue?: string | null;
    outputFormat?: string;
    type?: FilterTypeNames.SIMPLE_FILTER;
    viewFormat?: string;
}

export interface RangeDateFilter extends Filter {
    from: DateFilter;
    to: DateFilter;
    type: FilterTypeNames.RANGE_DATE_FILTER;
}
