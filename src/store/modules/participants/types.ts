import {
  WorkingRegion,
} from '@/types';

export interface ParticipantsState {
  regions: WorkingRegion[];
  financialYear: number | null;
  financialYears: number[];
  searchName: string;
  items: unknown[];
  region: WorkingRegion | null;
  improvingWays: WorkingRegion[];
}
