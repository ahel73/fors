import { AxiosError } from 'axios';
import { DeedItemCard } from './typesDeedItem';

export interface DeedControllerStore {
  data: any[];
  total: number | null;
  error: AxiosError | null;
  isLoading: boolean;
}
