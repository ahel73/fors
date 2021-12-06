import { AxiosError } from 'axios';

export interface QueuePriorityControllerStore {
  data: any[];
  error: AxiosError | null;
  isLoading: boolean;
}
