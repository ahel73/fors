import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';
import { FilterParams } from '@/types';
import { query } from '@/utils';

const fetchParticipantsList = async (params: FilterParams) : Promise<WorkingRegion[]> => {
  const { page = 0, sort = '-id', size, ...payload } = params;
  const queryParams = query({ page, sort, size });
  const { data } = await httpClient.post(`/payout-list-members/find?${queryParams}`, { ...payload });
  return data.data;
};

const fetchConsolidatedParticipantsList = async (params: any): Promise<WorkingRegion[]> => {
  const { page = 0, sort = '-id', size, ...payload } = params;
  const queryParams = query({ page, sort, size });
  const { data } = await httpClient.post(`/payout-list-members/find?${queryParams}`, { ...payload });
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

const postImprovingWays = async (): Promise<WorkingRegion[]> => {
  const { data } = await httpClient.post('/improving-ways/find');
  return data.data;
};

const postConformParticipants = async (params: any) : Promise<unknown> => {
  const { data } = await httpClient.post('/list-members/actions/agreement', { ...params });

  return data;
};

const postCreateSummaryParticipants = async (params: any) : Promise<unknown> => {
  const { data } = await httpClient.post('/summary-list-members', { ...params });

  return data;
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
  postImprovingWays,
  postCreateSummaryParticipants,
};
