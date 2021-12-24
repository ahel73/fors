import { AxiosError } from 'axios';

export interface ElectronicQueueStore {
  data: any[];
  total: number | null;
  error: AxiosError | null;
  isLoading: boolean;
}
