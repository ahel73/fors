import { DeedItemCard } from '@/types/DeedType';
import { AxiosError } from 'axios';

export interface DeedControllerItemStore {
  data: DeedItemCard;
  error: AxiosError | null;
  isLoading: boolean;
  documentEdit?: any;
  peopleEdit?: any;
  tab?: number;
}