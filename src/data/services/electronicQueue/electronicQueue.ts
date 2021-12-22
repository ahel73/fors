import httpClient from '@/data/http';
import { ListMembersParams, StateElectronicQueue, StateElectronicQueueData, StateElectronicQueueDataParams } from '@/types/ElectronicQueueDataItem';
import { query } from '@/utils';

export const getElectronicQueue = async (params: StateElectronicQueueDataParams = {} as StateElectronicQueueDataParams): Promise<StateElectronicQueueData> => {
  const { page = 0, sort = '-id', size } = params;
  const queryParams = query({ page, sort, size });
  const { data } = await httpClient.post<StateElectronicQueue>(`/applicants-queue/find?${queryParams}`, params.filter);
  return data;
};

export const postApplicantQueueArchive = async (params: number[]): Promise<number[]> => {
  const { data } = await httpClient.post('/applicants-queue/actions/archive', params);
  return data;
};

export const postListMembers = async (params: ListMembersParams): Promise<ListMembersParams> => {
  const { data } = await httpClient.post('/list-members', params);
  return data;
};
