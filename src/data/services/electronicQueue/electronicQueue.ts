import httpClient from '@/data/http';
import { FilterParams } from '@/types';

export const getElectronicQueue = async (params: FilterParams): Promise<any> => {
  const { page, sort, size, ...payload } = params;
  const queryParams = ({ page, sort, size });
  // eslint-disable-next-line max-len
  const { data } = await httpClient.post(`/applicants-queue/find?page=${queryParams.page}&size=${queryParams.size}&sort=${queryParams.sort}`, { ...payload });
  return data;
};
