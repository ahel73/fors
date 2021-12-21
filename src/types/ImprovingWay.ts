import { Meta } from './Meta';

export interface ImprovingWay {
  id: number,
  code: string,
  name: string
}

export interface ImprovingWayResponseData extends Meta {
  data: ImprovingWay[];
}
