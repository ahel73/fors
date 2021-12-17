import httpClient from '@/data/http';
import { DeedItemCard } from '@/store/accountingBusiness/typesDeedItem';

export const getDeedController = async (params: any = {} as any): Promise<any> => {
  const { page, sort, size, filter } = params;
  const queryParams = ({ page, sort, size });
  const filterData = ({ filter });
  const { data } = await httpClient.post<any>(`/deeds/find?page=${queryParams.page}&size=${queryParams.size}&sort=${queryParams.sort}`, filterData.filter);
  return data;
};

export const updateDeedController = async (params: any) => {
  const { data } = await httpClient.put<any>(`/deeds/${params.id}`, params);
  return data;
};

export const deleteDeedController = async (id: string | number) => {
  const { data } = await httpClient.delete<any>(`/deeds/${id}`);
  return data;
};

export const createDeedController = async (form: DeedItemCard) => {
  const { data } = await httpClient.post<any>('/deeds', form);
  return data;
};

export const getDeedControllerByID = async (id: number) => {
  const { data } = await httpClient.get<any>(`/deeds/${id}`);
  return data;
};

export const onRecordAccounting = async (data: any) => {
  const { content } = await httpClient.post<any>('deeds/actions/accounting', data);
  return content;
};

export const undoRecordAccounting = async (data: any) => {
  const { content } = await httpClient.post<any>('/deeds/actions/undo-accounting', data);
  return content;
};
