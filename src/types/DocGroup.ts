import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

export interface DocGroup {
  id: number,
  name: string,
}

export interface DocGroupResponseData extends Meta {
  data: DocGroup[];
}

export type DocGroupResponse = AxiosResponse<DocGroupResponseData>;
