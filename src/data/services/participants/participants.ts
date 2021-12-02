import httpClient from '@/data/http';
import { WorkingRegion } from '@/types/WorkingRegion';

const fetchParticipantsList = async (params: unknown) : Promise<WorkingRegion[]> => {
  const { data } = await httpClient.get('/payout-list-members');

  return data;
};

const fetchRegions = async (): Promise<WorkingRegion[]> => {
  // const { data } = await httpClient.get('/regions');

  // return data;
  return [{ id: 1, name: '1', code: '1' }, { id: 2, name: '2', code: '3' }, { id: 3, name: '3', code: '3' }];
};

export {
  fetchParticipantsList,
  fetchRegions,
};
