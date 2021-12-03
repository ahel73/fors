import { Action, Getter, Mutation, State } from 'vuex-simple';
import {
  fetchParticipantsList,
  fetchRegions,
} from '@/data';
import {
  WorkingRegion,
} from '@/types';
import { ParticipantsState } from './types';

export default class ParticipantsModule {
  @State()
  state: ParticipantsState = {
    regions: [],
    financialYear: null,
    searchName: '',
    items: [],
  }

  @Mutation()
  setSearchName(payload: string) {
    this.state.searchName = payload;
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
  async fetchMembers({
    name, page, size, sort, type,
  } : {
    name?: string;
    page?: string;
    size?: string;
    sort?: string;
    type: string;
  }) {
    const filterParams: unknown = {
      name: name,
      page: page,
      size: size,
      sort: sort,
    };
    if (type === 'payout' || type === 'hiring') {
      const result = await fetchParticipantsList(filterParams, type);
      this.setItems(result);
    }
  }
}
