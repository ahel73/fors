import httpClient from '@/data/http';
import { query } from '@/utils';

export const getEmploymentController = async () => {
  const { data } = await httpClient.post<any>('/employments/find');
  return data;
};
