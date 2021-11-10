import { SelectItem } from '@/components/shared/Filter/FilterTypes/SelectFilter/SelectFilter.types';

export interface Filter {
  items? : SelectItem[];
  isCustom?: boolean;
  isDefault?: boolean;
  label?: string;
  like?: boolean;
  name: string;
  names?: string[];
  negative?: boolean;
  order?: number;
}
