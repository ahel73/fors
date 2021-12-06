import { AxiosError } from 'axios';

export interface DeedStatusControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
