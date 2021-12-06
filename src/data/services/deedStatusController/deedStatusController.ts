import httpClient from '@/data/http';
import { query } from '@/utils';

export const getDeedStatusController = async () => {
  const { data } = await httpClient.post<any>('/deed-statuses/find');
  return data;
};
