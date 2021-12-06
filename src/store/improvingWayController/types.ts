import { AxiosError } from 'axios';

export interface ImprovingWayControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
