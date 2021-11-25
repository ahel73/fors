import { Module, Getters, Mutations, Actions, createMapper } from 'vuex-smart-module';
import {
  fetchParticipantsList
} from '@/data';
import {
  WorkingRegion,
} from '@/types';

class ParticipantsState {
  region: WorkingRegion | null = null;
  financialYear: number | null = null;
  searchName = '';
  items: unknown[] = [];
}

class ParticipantsGetters extends Getters<ParticipantsState> {
  getSearchName() {
    return this.state.searchName;
  }

  getItems() {
    return this.state.items;
  }

  getFinancialYear() {
    return this.state.financialYear;
  }

  getRegion() {
    return this.state.region;
  }
}

class ParticipantsMutations extends Mutations<ParticipantsState> {
  setSearchName(payload: string) {
    this.state.searchName = payload;
  }

  setItems(payload: unknown[]) {
    this.state.items = payload;
  }

  setFinancialYear(payload: number) {
    this.state.financialYear = payload;
  }

  setRegion(payload: WorkingRegion) {
    this.state.region = payload;
  }
}

class ParticipantsActions extends Actions<
ParticipantsState,
ParticipantsGetters,
ParticipantsMutations,
ParticipantsActions
> {
  async fetchItems({
    name, page, size, sort
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
    this.commit('setItems', result);
  }
  // async fetchHeadGRBSData({
  //   headTypeId, headTypeCode,
  //   name, page, size, sort,
  // }: {
  //   headTypeId?: string;
  //   headTypeCode?: HeadTypeCodes;
  //   name?: string;
  //   page?: string;
  //   size?: string;
  //   sort?: string;
  // }) {
  //   const filterParams: HeadGRBSRequestParams = {
  //     headTypeId: headTypeId,
  //     headTypeCode: headTypeCode,
  //     name: name,
  //     page: page,
  //     size: size,
  //     sort: sort,
  //   };
  //   const result = await fetchHeadGRBS(filterParams);

  //   this.commit('setHeadGRBSData', result);
  // }
}

export const participants = new Module({
  state: ParticipantsState,
  getters: ParticipantsGetters,
  mutations: ParticipantsMutations,
  actions: ParticipantsActions,
});

export const participantsMapper = createMapper(participants);
