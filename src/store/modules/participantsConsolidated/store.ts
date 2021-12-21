import { Action, Mutation, State } from 'vuex-simple';
import {
  fetchConsolidatedParticipantsList,
  fetchRegions,
} from '@/data';
import {
  FilterParams,
  WorkingRegion,
} from '@/types';
import { ParticipantsConsolidatedState } from './types';

export default class ParticipantsConsolidatedModule {
  @State()
  state: ParticipantsConsolidatedState = {
    regions: [],
    financialYear: null,
    items: [],
  }

  @Mutation()
  setItems(payload: unknown[]) {
    this.state.items = payload;
  }

  @Mutation()
  setFinancialYear(payload: number) {
    this.state.financialYear = payload;
  }

  @Mutation()
  setRegions(payload: WorkingRegion[]) {
    this.state.regions = payload;
  }

  @Action()
  async fetchRegions() {
    const result = await fetchRegions();
    this.setRegions(result as WorkingRegion[]);
  }

  @Action()
  async fetchItems({
    page, size, sort,
  } : {
    page?: string;
    size?: string;
    sort?: string;
  }) {
    const filterParams: any = {
      page: page,
      size: size,
      sort: sort,
      summaryListMembersFinancialYear: this.state.financialYear,
      summaryListMembersRegionCode: 'CODE',
    };
    const result = await fetchConsolidatedParticipantsList(filterParams);
    this.setItems(result);
  }
}
