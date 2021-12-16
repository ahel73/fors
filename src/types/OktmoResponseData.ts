import { Meta } from './Meta';
import { Oktmo } from './Oktmo';

export interface OktmoResponseData extends Meta {
  data: Oktmo[];
}
