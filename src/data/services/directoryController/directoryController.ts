import httpClient from '@/data/http';

export const getDeedStatusController = async () => {
  const { data } = await httpClient.post<any>('/deed-statuses/find');
  return data;
};

export const getDocGroupController = async () => {
  const { data } = await httpClient.post<any>('/doc-groups/find');
  return data;
};

export const getEmploymentController = async () => {
  const { data } = await httpClient.post<any>('/employments/find');
  return data;
};

export const getImprovingWayController = async () => {
  const { data } = await httpClient.post<any>('/improving-ways/find');

  return data;
};

export const getIndividualPersonInfoController = async (params?: any) => {
  const { data } = await httpClient.post<any>('/individual-person-infos/find', params);
  return data;
};

export const getOktmoController = async (params: any) => {
  const filter = { regionCode: 20 };
  const { data } = await httpClient.post<any>('/oktmo/find', filter);
  return data;
};

export const getQueuePriorityController = async () => {
  const { data } = await httpClient.post<any>('/queue-priorities/find');
  return data;
};

export const getSpendingDirectionController = async () => {
  const { data } = await httpClient.post<any>('/spending-directions/find');
  return data;
};
