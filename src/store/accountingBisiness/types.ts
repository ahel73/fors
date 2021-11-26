import { AxiosError } from 'axios';

export interface DeedControllerStore {
  data: any[];
  total: number | null;
  error: AxiosError | null;
  isLoading: boolean;
}
