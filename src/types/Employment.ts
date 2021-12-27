import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

export interface Employment {
  id: number,
  code: string,
  name: string
}

export interface EmploymentResponseData extends Meta {
  data: Employment[];
}

export type EmploymentResponse = AxiosResponse<EmploymentResponseData>;
