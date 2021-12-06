import { AxiosError } from 'axios';

export interface DocGroupControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
