import { AxiosResponse } from 'axios';
import { Meta } from './Meta';
import { Oktmo } from './Oktmo';

export interface OktmoResponseData extends Meta {
  data: Oktmo[];
}

export type OktmoResponse = AxiosResponse<OktmoResponseData>;
