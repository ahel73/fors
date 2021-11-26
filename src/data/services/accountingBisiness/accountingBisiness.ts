import httpClient from '@/data/http';
import { query } from '@/utils';

export const getDeedController = async (params: any = {} as any): Promise<any> => {
  const { page = 0, sort = '-id', size } = params;
  const queryParams = query({ ...params, page, sort, size });
  const { data } = await httpClient.get<any>('/deeds');
  return data;
};

export const updateDeedController = async (id: any, form: any) => {
  const { data } = await httpClient.put<any>(`/deeds/${id}`, form);
  return data;
};

export const deleteDeedController = async (id: any) => {
  const { data } = await httpClient.delete<any>(`/deeds/${id}`);
  return data;
};

export const createDeedController = async (form: any) => {
  const { data } = await httpClient.post<any>('/deeds', form);
  return data;
};

export const getDeedControllerByID = async (id: any) => {
  const { data } = await httpClient.get<any>(`/deeds/${id}`);

  return data;
};

export const getDocGroupController = async () => {
  const { data } = await httpClient.get<any>('/doc-groups');
  return data;
};

export const getEmploymentController = async () => {
  const { data } = await httpClient.get<any>('/employments');
  return data;
};

export const getImprovingWayController = async () => {
  const { data } = await httpClient.get<any>('/improving-ways');

  return data;
};

export const getOktmoController = async () => {
  const queryParams = query({ regioncode: 20 });
  const { data } = await httpClient.get<any>(`/oktmo?${queryParams}`);
  return data;
};

export const getQueuePriorityController = async () => {
  const { data } = await httpClient.get<any>('/queue-priorities');
  return data;
};

export const getSpendingDirectionController = async () => {
  const { data } = await httpClient.get<any>('/spending-directions');
  return data;
};

export const getDeedStatusController = async () => {
  const { data } = await httpClient.get<any>('/deed-statuses');
  return data;
};

export const getIndividualPersonInfoController = async () => {
  const { data } = await httpClient.get<any>('/individual-person-infos');
  return data;
};
