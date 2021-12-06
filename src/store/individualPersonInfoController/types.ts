import { AxiosError } from 'axios';

export interface PersonInfoControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
