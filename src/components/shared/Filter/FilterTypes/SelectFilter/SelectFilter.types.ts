import { Filter } from '@/components/shared/Filter/Filter.types';
import { FilterTypeNames, ValueTypes } from '@/components/shared/Filter/types';

export type SelectValueTypes = ValueTypes.STRING | ValueTypes.NUMBER | ValueTypes.BOOL;

export interface SelectItem {
    text: string;
    value: string | number | boolean | null;
    code?: string;
}

export interface SelectValue {
    multiple: boolean | undefined;
    name: string;
    text: string;
    type: FilterTypeNames.SELECT_FILTER;
    value: SelectItem | SelectItem[] | null;
    valueType: SelectValueTypes;
}

export interface SelectModel {
    [key: string]: SelectValue;
}

export interface SelectFilter extends Filter {
    defaultValue?: SelectItem[] | SelectItem | null;
    items?: SelectItem[];
    itemsLength?: number;
    multiple?: boolean;
    showCode?: boolean;
    showHierarchy?: boolean;
    onPageChange?: (pagination: { page: number, perPage: number, value: string }) => void;
    onEnter?: (value: string) => void;
    onSearchInputUpdate?: (searchValue: string) => void;
    noFilter?: boolean;
    searchMode?: boolean;
    type: FilterTypeNames.SELECT_FILTER;
    valueType: SelectValueTypes;
}
