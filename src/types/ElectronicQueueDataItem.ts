import { AxiosResponse } from 'axios';
import { ImprovingWay } from './ImprovingWay';
import { Meta } from './Meta';
import { Pagination } from './Pagination';

export interface Filter {
  applicantId: number | null,
  employmentId: number | null,
  groupNum: number | null,
  improvingWayId: number | null,
  queuePriorityId: number | null,
  statusId: number | null,
}

interface Applicants {
  deedId: string | number,
  statusName: string
  }

export interface ListMembersParams {
  listMember: {
    improvingWay: ImprovingWay,
    financialYear: string | number,
  },
  applicants: Applicants[],
}

export interface ElectronicQueueDataItem {
  applicantFullName: string,
  deedId: number,
  employmentName: string,
  groupNum: number,
  id: number,
  improvingWayName: string,
  numChangeDate: string,
  queueNum: number,
  queuePriorityName: string,
  registrationDate: string,
  statusName: string,
}

export interface StateElectronicQueueData extends Meta {
  data: ElectronicQueueDataItem[];
}

export interface StateElectronicQueueDataParams extends Partial<Pagination> {
  filter?: Filter;
}

export type StateElectronicQueue = AxiosResponse<StateElectronicQueueData>;
