import httpClient from '@/data/http';
import { query } from '@/utils';

export const getIndividualPersonInfoController = async (params?: any) => {
  const { data } = await httpClient.post<any>('/individual-person-infos/find', params);
  return data;
};
