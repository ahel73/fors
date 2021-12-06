import httpClient from '@/data/http';
import { query } from '@/utils';

export const getSpendingDirectionController = async () => {
  const { data } = await httpClient.post<any>('/spending-directions/find');
  return data;
};
