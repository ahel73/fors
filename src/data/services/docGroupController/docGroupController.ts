import httpClient from '@/data/http';
import { query } from '@/utils';

export const getDocGroupController = async () => {
  const { data } = await httpClient.post<any>('/doc-groups/find');
  return data;
};
