export interface SimpleHeader {
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  colSpan?: number;
  rowSpan?: number;
  text?: string;
}

export interface SimpleItem {
  [key: string]: unknown;
}
