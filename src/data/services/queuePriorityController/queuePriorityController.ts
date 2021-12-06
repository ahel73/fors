import httpClient from '@/data/http';
import { query } from '@/utils';

export const getQueuePriorityController = async () => {
  const { data } = await httpClient.post<any>('/queue-priorities/find');
  return data;
};
