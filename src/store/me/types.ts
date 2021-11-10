import { AxiosError } from 'axios';
import { Person } from '@/types/Person';

export interface MeState {
  data: Person | null;
  error: AxiosError | null;
  loading: boolean;
}

export interface MeModel {
  state: MeState;
}
