import {
  WorkingRegion,
} from '@/types';

export interface ParticipantsState {
  regions: WorkingRegion[];
  financialYear: number | null;
  searchName: string;
  items: unknown[];
}
