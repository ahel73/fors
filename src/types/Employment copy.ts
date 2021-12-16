import { Meta } from './Meta';

export interface Priority {
  id: number,
  code: string,
  name: string
}

export interface PriorityResponseData extends Meta {
  data: Priority[];
}
