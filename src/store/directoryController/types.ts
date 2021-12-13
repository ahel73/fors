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
  error: AxiosError | null;
  isLoading: boolean;
}
