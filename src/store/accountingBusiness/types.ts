import { DeedItemCard } from '@/types/AccountBissiness';
import { AxiosError } from 'axios';

export interface DeedControllerStore {
  data: DeedItemCard[];
  total: number | null;
  error: AxiosError | null;
  isLoading: boolean;
}
