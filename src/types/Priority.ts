import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

export interface Priority {
  id: number,
  code: string,
  name: string
}

export interface PriorityResponseData extends Meta {
  data: Priority[];
}

export type PriorityResponse = AxiosResponse<PriorityResponseData>;
