import {
  WorkingRegion,
} from '@/types';

export interface ParticipantsConsolidatedState {
  regions: WorkingRegion[];
  financialYear: number | null;
  items: unknown[];
}
