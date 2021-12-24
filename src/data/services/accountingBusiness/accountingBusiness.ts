import httpClient from '@/data/http';
import { DeedItemCard, StateDeed, StateDeedData, StateDeedDataParams } from '@/types/AccountBissiness';
import { query } from '@/utils';

export const getDeedController = async (params: StateDeedDataParams = {} as StateDeedDataParams): Promise<StateDeedData> => {
  const { page = 0, sort = '-id', size } = params;
  const queryParams = query({ page, sort, size });
  const { data } = await httpClient.post<StateDeed>(`/deeds/find?${queryParams}`, params.filter);
  return data;
};

export const updateDeedController = async (params: DeedItemCard): Promise<never> => {
  const { data } = await httpClient.put<never>(`/deeds/${params.id}`, params);
  return data;
};

export const deleteDeedController = async (id: string | number): Promise<never> => {
  const { data } = await httpClient.delete<never>(`/deeds/${id}`);
  return data;
};

export const createDeedController = async (form: DeedItemCard) => {
  const { data } = await httpClient.post('/deeds', form);
  return data;
};

export const getDeedControllerByID = async (id: number | string) => {
  const { data } = await httpClient.get(`/deeds/${id}`);
  return data;
};

export const onRecordAccounting = async (data: any): Promise<never> => {
  const { content } = await httpClient.post<never>('deeds/actions/accounting', data);
  return content;
};

export const undoRecordAccounting = async (data: any): Promise<never> => {
  const { content } = await httpClient.post<never>('/deeds/actions/undo-accounting', data);
  return content;
};
