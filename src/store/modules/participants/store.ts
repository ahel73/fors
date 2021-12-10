import { Action, Mutation, State } from 'vuex-simple';
import {
  fetchParticipantsList,
  fetchRegions,
  fetchYears,
  postConformParticipants,
} from '@/data';
import {
  FilterParams,
  WorkingRegion,
} from '@/types';
import { ParticipantsState } from './types';
import eventBus from '@/utils/bus/event-bus';

export default class ParticipantsModule {
  @State()
  state: ParticipantsState = {
    regions: [],
    financialYears: [],
    financialYear: null,
    searchName: '',
    items: [],
    region: null,
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
  setFinancialYear(payload: number | null) {
    this.state.financialYear = payload;
  }

  @Mutation()
  setRegions(payload: WorkingRegion[]) {
    this.state.regions = payload;
  }

  @Mutation()
  setCurrentRegion(payload: WorkingRegion | null) {
    this.state.region = payload;
  }

  @Mutation()
  setFinancialYears(payload: number[]) {
    this.state.financialYears = payload;
  }

  @Action()
  async setSearch(year: number | null, region: WorkingRegion | null) {
    this.setFinancialYear(year);
    this.setCurrentRegion(region);
  }

  @Action()
  async fetchRegions() {
    const result = await fetchRegions();
    this.setRegions(result as WorkingRegion[]);
  }

  @Action()
  async fetchYears() {
    const result = await fetchYears();
    this.setFinancialYears(result);
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
    const filterParams: FilterParams = {
      name: name,
      page: page,
      size: size,
      sort: sort,
    };
    try {
      if (type === 'payout' || type === 'hiring') {
        const result = await fetchParticipantsList(filterParams, type);
        this.setItems(result);
      }
    } catch (error) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Произошла ошибка при получении списка участников',
          title: 'Ошибка',
          type: 'error',
        }
      );
    }
  }

  @Action()
  async conformMembers({
    type, year
  } : {
    type: string;
    year: number | null;
  }) {
    const result = await postConformParticipants(type);
  }
}
