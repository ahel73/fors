import httpClient from '@/data/http';
import { FilterParams } from '@/types';

export const getElectronicQueue = async (params: any): Promise<any> => {
  const { page, sort, size, filter } = params;
  const queryParams = ({ page, sort, size });
  const filterData = ({ filter });
  // eslint-disable-next-line max-len
  const { data } = await httpClient.post(`/applicants-queue/find?page=${queryParams.page}&size=${queryParams.size}&sort=${queryParams.sort}`, filterData.filter);
  return data;
};
