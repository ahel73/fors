export type FormDataItem = {
  [key: string]: string | Blob;
}

export interface SignData {
  [key: string]: FormDataItem;
}
