import { AxiosError } from 'axios';

export interface SpendingDirectionControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
