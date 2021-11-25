import {
  WorkingRegion,
} from '@/types';

export interface ParticipantsState {
  regions: WorkingRegion[] | null;
  financialYear: number | null;
  searchName: string;
  items: unknown[];
}
