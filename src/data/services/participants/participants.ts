import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';
import { FilterParams } from '@/types';

const fetchParticipantsList = async (params: FilterParams, type: string) : Promise<WorkingRegion[]> => {
  const { data } = await httpClient.post(`/${type}-list-members/find`, { ...params });
  return data.data;
};

const fetchConsolidatedParticipantsList = async (params: object): Promise<WorkingRegion[]> => {
  const { data } = await httpClient.post('/hiring-list-members/find', { ...params });
  return data.data;
};

const fetchYears = async (): Promise<number[]> => {
  const { data } = await httpClient.get('/list-members/financialYears');

  return data;
};

const fetchRegions = async (): Promise<WorkingRegion[]> => {
  const { data } = await httpClient.get('/list-members/areas');

  return data;
};

const postConformParticipants = async (type: string) : Promise<unknown> => {
  // const { data } = await httpClient.get('/regions');

  // return data;
  return true;
};

const fetchParticipantCard = async (id: string, type: string) : Promise<unknown> => {
  const { data } = await httpClient.get(`/${type}-list-members/${id}`);
  return data;
};

const putParticipantCard = async (payload: any, id: string, type: string) : Promise<unknown> => {
  const { data } = await httpClient.put(`/${type}-list-members/${id}`, { ...payload });
  return data;
};

export {
  fetchParticipantsList,
  fetchConsolidatedParticipantsList,
  fetchYears,
  fetchRegions,
  postConformParticipants,
  fetchParticipantCard,
  putParticipantCard,
};
