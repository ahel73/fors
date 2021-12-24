import { AxiosResponse } from 'axios';
import { Meta } from './Meta';

interface IdentityDoc {
  id: number,
  seriesNum: string,
  typeName: string
}

export interface IndividualPersonInfo {
  id: number,
  fullName: string,
  birthDate: string,
  identityDoc: IdentityDoc
}

export interface IndividualPersonResponseData extends Meta {
  data: IndividualPersonInfo[];
}

export type IndividualPersonInfoResponse = AxiosResponse<IndividualPersonResponseData>;
