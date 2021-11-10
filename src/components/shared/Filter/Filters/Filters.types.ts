import { FlattenedFilter, FilterTypeNamesKeys } from '@/components/shared/Filter/types';
import { OutputFilterValue } from '@/components/shared/Filter/FilterTypes/types';
import { RangeSimpleModel } from '@/components/shared/Filter/FilterTypes/RangeSimpleFilter/RangeSimpleFilter.types';
import { MultiModel } from '@/components/shared/Filter/FilterTypes/MultiFilter/MultiFilter.types';
import { RangeDateModel } from '@/components/shared/Filter/FilterTypes/RangeDateFilter/RangeDateFilter.types';
import { SelectModel } from '@/components/shared/Filter/FilterTypes/SelectFilter/SelectFilter.types';
import { SimpleModel } from '@/components/shared/Filter/FilterTypes/SimpleFilter/SimpleFilter.types';

export type Models = SimpleModel | SelectModel | RangeSimpleModel | RangeDateModel | MultiModel;

export interface FilterBaseProps {
    name?: string;
    names?: string;
    getModel: (filter: FlattenedFilter) => Models;
    getLabel: (model: unknown) => string;
    getValue: (model: unknown) => OutputFilterValue;
}

export type FilterRef = {
    [K in FilterTypeNamesKeys]: (Element & FilterBaseProps)[];
}
