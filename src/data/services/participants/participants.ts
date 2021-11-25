import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';

const fetchParticipantsList = async (params: unknown) : Promise<WorkingRegion[]> => {
  const { data } = await httpClient.get('/participants');

  return data;
};

const fetchRegions = async (): Promise<unknown[]> => {
  // const { data } = await httpClient.get('/regions');

  // return data;
  return [1, 2, 3];
};

export {
  fetchParticipantsList,
  fetchRegions,
};
