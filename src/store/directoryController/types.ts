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
  error: AxiosError | null;
  isLoading: boolean;
}
