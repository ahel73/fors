import { AxiosError } from 'axios';
import { DeedItemCard } from './typesDeedItem';

export interface DeedControllerItemStore {
  data: DeedItemCard;
  error: AxiosError | null;
  isLoading: boolean;
  documentEdit?: any;
  peopleEdit?: any;
  tab?: number;
}
