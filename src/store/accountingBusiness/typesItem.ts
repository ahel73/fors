import { AxiosError } from 'axios';
import { DeedItemCard } from './deedItemCard';

export interface DeedControllerItemStore {
  data: DeedItemCard;
  error: AxiosError | null;
  isLoading: boolean;
  itemEdit?: any;
  peopleEdit?: any;
}
