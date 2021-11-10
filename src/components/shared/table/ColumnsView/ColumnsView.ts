import { TableHeaders } from '@/components/shared/table/DataTable.types';

export interface Columns<T = string> extends TableHeaders<T> {
  catalogId?: BigInt;
  children?: Columns<T>[];
  id?: BigInt;
  isDefault?: boolean;
  isEditable?: boolean;
  isVisible?: boolean;
  row?: boolean;
}

export interface ColumnModel {
  [key: string]: boolean | null;
}
