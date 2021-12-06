import httpClient from '@/data/http';
import { query } from '@/utils';

export const getOktmoController = async (params: any) => {
  const filter = { regioncode: 20 };
  const { data } = await httpClient.post<any>('/oktmo/find', filter);
  return data;
};
