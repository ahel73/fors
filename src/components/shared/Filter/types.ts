import { SimpleFilter } from './FilterTypes/SimpleFilter/SimpleFilter.types';
import { OutputFilterLabels, OutputFilters } from './FilterTypes/types';
import { MultiFilter } from './FilterTypes/MultiFilter/MultiFilter.types';
import { RangeDateFilter } from './FilterTypes/RangeDateFilter/RangeDateFilter.types';
import { RangeSimpleFilter } from './FilterTypes/RangeSimpleFilter/RangeSimpleFilter.types';
import { SelectFilter } from './FilterTypes/SelectFilter/SelectFilter.types';
import { CheckboxSimpleFilter } from './FilterTypes/CheckboxSimpleFilter/CheckboxSimpleFilter';

export enum ValueTypes {
  BOOL = 'BOOL',
  DATE = 'DATE',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
}

export enum FilterOutputTypes {
  MULTI_FILTER_ITEM = 'MultiFilterItem',
  RANGE_FILTER_ITEM = 'RangeFilterItem',
  SIMPLE_FILTER_ITEM = 'SimpleFilterItem',
}

export enum FilterTypeNames {
  AUTOCOMPLETE_FILTER = 'AUTOCOMPLETE_FILTER',
  CHECKBOX_SIMPLE_FILTER = 'CHECKBOX_SIMPLE_FILTER',
  MULTI_FILTER = 'MULTI_FILTER',
  RANGE_DATE_FILTER = 'RANGE_DATE_FILTER',
  RANGE_SIMPLE_FILTER = 'RANGE_SIMPLE_FILTER',
  SELECT_FILTER = 'SELECT_FILTER',
  SIMPLE_FILTER = 'SIMPLE_FILTER',
}

export type FilterTypeNamesKeys = keyof typeof FilterTypeNames;

export type FlattenedFilter = SimpleFilter | CheckboxSimpleFilter | SelectFilter
  | RangeSimpleFilter | RangeDateFilter | MultiFilter;

export interface FilterTypes {
  checkboxSimpleFilters?: CheckboxSimpleFilter[];
  multiFilters?: MultiFilter[];
  rangeDateFilters?: RangeDateFilter[];
  rangeSimpleFilters?: RangeSimpleFilter[];
  selectFilters?: SelectFilter[];
  simpleFilters?: SimpleFilter[];
}

export interface SearchInfo {
  outputFilterLabels: OutputFilterLabels;
  outputFilters: OutputFilters;
}
