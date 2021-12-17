import { Status } from '@/types/Status';
import { AxiosError } from 'axios';

export interface DirectoryControllerStore {
  deedStatus: [],
  deedDocGroup: [],
  employment: [],
  improvingWay: [],
  personInfo: [],
  oktmo: [],
  priority: [],
  spendingDirection: [],
  familyPeopleInFamily: [],
  queueStatus: Status[],
  error: AxiosError | null;
  isLoading: boolean;
}
