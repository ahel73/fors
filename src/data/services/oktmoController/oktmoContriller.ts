import httpClient from '@/data/http';
import { query } from '@/utils';

export const getOktmoController = async (params: any) => {
  const queryParams = query({ regioncode: 20 });
  // const { data } = await httpClient.post<any>('/oktmo/find');
  return '';
};
