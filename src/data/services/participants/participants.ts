import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';

const fetchParticipantsList = async (params: unknown, type: string) : Promise<WorkingRegion[]> => {
  const { data } = await httpClient.post(`/${type}-list-members/find`, { });
  console.log(data);
  return data.data;
};

const fetchConsolidatedParticipantsList = async (params: object): Promise<WorkingRegion[]> => {
  const { data } = await httpClient.post('/hiring-list-members/find', { ...params });
  console.log(data);
  return data.data;
};

const fetchRegions = async (): Promise<WorkingRegion[]> => {
  // const { data } = await httpClient.get('/regions');

  // return data;
  return [{ id: 1, name: '1', code: '1' }, { id: 2, name: '2', code: '3' }, { id: 3, name: '3', code: '3' }];
};

export {
  fetchParticipantsList,
  fetchConsolidatedParticipantsList,
  fetchRegions,
};
