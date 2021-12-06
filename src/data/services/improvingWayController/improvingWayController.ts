import httpClient from '@/data/http';
import { query } from '@/utils';

export const getImprovingWayController = async () => {
  const { data } = await httpClient.post<any>('/improving-ways/find');

  return data;
};
