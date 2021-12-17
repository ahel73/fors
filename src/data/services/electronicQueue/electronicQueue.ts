import httpClient from '@/data/http';
import { StateElectronicQueue, StateElectronicQueueData, StateElectronicQueueDataParams } from '@/types/ElectronicQueueDataItem';

export const getElectronicQueue = async (params: StateElectronicQueueDataParams = {} as StateElectronicQueueDataParams): Promise<StateElectronicQueueData> => {
  const { page, sort, size, filter } = params;
  const queryParams = ({ page, sort, size });
  const filterData = ({ filter });
  // eslint-disable-next-line max-len
  const { data } = await httpClient.post<StateElectronicQueue>(`/applicants-queue/find?page=${queryParams.page}&size=${queryParams.size}&sort=${queryParams.sort}`, filterData.filter);
  return data;
};

export const postApplicantQueueArchive = async (params: number[]): Promise<number[]> => {
  const { data } = await httpClient.post('/applicants-queue/actions/archive', params);
  return data;
};
