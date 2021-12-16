import { Meta } from './Meta';

export interface Status {
  id: number,
  name: string,
}

export interface StatusResponseData extends Meta {
  data: Status[];
}
