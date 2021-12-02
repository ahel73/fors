import { Action, Getter, Mutation, State } from 'vuex-simple';
import {
  fetchParticipantsList,
  fetchRegions,
} from '@/data';
import {
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

  @Getter()
  getItems() {
    return this.state.items;
  }

  @Getter()
  getFinancialYear() {
    return this.state.financialYear;
  }

  @Getter()
  getRegions() {
    return this.state.regions;
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
    name, page, size, sort,
  } : {
    name?: string;
    page?: string;
    size?: string;
    sort?: string;
  }) {
    console.log(name, page, size, sort);
    const filterParams: unknown = {
      name: name,
      page: page,
      size: size,
      sort: sort,
    };
    const result = await fetchParticipantsList(filterParams);
    this.setItems(result);
  }
}
