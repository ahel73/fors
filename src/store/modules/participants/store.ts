import { Action, Mutation, State } from 'vuex-simple';
import {
  fetchParticipantsList,
  fetchRegions,
  fetchYears,
  postConformParticipants,
  postCreateSummaryParticipants,
  postImprovingWays,
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
    improvingWays: [],
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

  @Mutation()
  setImprovingWays(payload: WorkingRegion[]) {
    this.state.improvingWays = payload;
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
    name, page, size, sort,
  } : {
    name?: string;
    page?: string;
    size?: string;
    sort?: string;
  }) {
    const filterParams: FilterParams = {
      name: name,
      page: page,
      size: size,
      sort: sort,
    };
    try {
      const result = await fetchParticipantsList(filterParams);
      this.setItems(result);
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
    improvingWay, financialYear, areaCode
  } : {
    improvingWay: WorkingRegion;
    financialYear: number | null;
    areaCode: string | null;
  }) {
    const result = await postConformParticipants({ improvingWay, financialYear, areaCode });
    console.log(result);
  }

  @Action()
  async createSummaryList({
    improvingWay, financialYear, regionCode
  } : {
    improvingWay: WorkingRegion;
    financialYear: number | null;
    regionCode: string | null;
  }) {
    const result = await postCreateSummaryParticipants({ improvingWay, financialYear, regionCode });
    console.log(result);
  }

  @Action()
  async fetchImprovingWays() {
    const result = await postImprovingWays();
    this.setImprovingWays(result);
    return result;
  }
}
