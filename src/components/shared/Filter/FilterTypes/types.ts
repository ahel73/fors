import { ValueTypes, FilterOutputTypes } from '@/components/shared/Filter/types';
import { SelectItem } from '@/components/shared/Filter/FilterTypes/SelectFilter/SelectFilter.types';

export interface SearchValue {
  negative: boolean;
  like?: boolean;
  type: FilterOutputTypes;
  valueType: ValueTypes;
  name?: string;
  names?: string[];
}

export interface MultiSearchValue extends SearchValue {
  value: string[];
}

export interface TextSearchValue extends SearchValue {
  value: Array<string | number | null>;
}

export interface SelectSearchValue extends SearchValue {
  value: SelectItem[];
}

export interface RangeSearchValue extends SearchValue {
  valueFrom?: Array<string | null>;
  valueTo?: Array<string | null>;
}

export interface CheckboxSearchValue extends SearchValue {
  value: Array<string | null>;
}

export type OutputFilterLabels = string[];

export type OutputFilterValue = TextSearchValue | SelectSearchValue | CheckboxSearchValue;

export type OutputFilterValues = OutputFilterValue[];

export type OutputFilters = Array<TextSearchValue | SelectSearchValue | CheckboxSearchValue | MultiSearchValue>;
