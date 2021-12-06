import { AxiosError } from 'axios';

export interface OktmoControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
