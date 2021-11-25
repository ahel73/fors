import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';

const fetchParticipantsList = async (params: unknown) : Promise<WorkingRegion[]> => {
  const { data } = await httpClient.get('/participants');

  return data;
};

export {
  fetchParticipantsList,
};
