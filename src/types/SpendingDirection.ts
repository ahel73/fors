import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

export interface SpendingDirection {
  id: number,
  code: string,
  name: string
}

export interface SpendingDirectionResponseData extends Meta {
  data: SpendingDirection[];
}

export type SpendingDirectionResponse = AxiosResponse<SpendingDirectionResponseData>;
