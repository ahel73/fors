import { AxiosError } from 'axios';

export interface EmploymentControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
