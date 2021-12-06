import httpClient from '@/data/http';
import { query } from '@/utils';

export const getIndividualPersonInfoController = async () => {
  const { data } = await httpClient.post<any>('/individual-person-infos/find');
  return data;
};
