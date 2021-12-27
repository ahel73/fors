import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

export interface Status {
  id: number,
  name: string,
}

export interface StatusResponseData extends Meta {
  data: Status[];
}

export type StatusResponse = AxiosResponse<StatusResponseData>;
