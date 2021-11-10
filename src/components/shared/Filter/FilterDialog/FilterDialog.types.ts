import { OutputFilters } from '@/components/shared/Filter/FilterTypes/types';
import { Models } from '@/components/shared/Filter/Filters/Filters.types';
import { SelectItem } from '../FilterTypes/SelectFilter/SelectFilter.types';

export interface FiltersBaseProps {
    getLabels: () => string;
    getModels: () => Models;
    getValues: () => OutputFilters;
    setValue: (value: (string | null)[] | (string | number | boolean | null)[] | SelectItem | SelectItem[], path: string, type: string) => void;
    resetModels: () => void;
}

export type Refs = {
    filters: (Element & FiltersBaseProps);
}
