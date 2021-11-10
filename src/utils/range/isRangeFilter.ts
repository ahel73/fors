import { FilterTypeNames } from '@/components/shared/Filter/types';

export const isRangeFilter = (type: string): boolean => {
  return type === FilterTypeNames.RANGE_DATE_FILTER || type === FilterTypeNames.RANGE_SIMPLE_FILTER;
};
