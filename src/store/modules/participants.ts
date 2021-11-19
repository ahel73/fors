import { Module, Getters, Mutations, Actions, createMapper } from 'vuex-smart-module';
import {
} from '@/data';
import {
} from '@/types';

class ParticipantsState {
  searchName = '';
}

class ParticipantsGetters extends Getters<ParticipantsState> {
  getSearchName() {
    return this.state.searchName;
  }
}

class ParticipantsMutations extends Mutations<ParticipantsState> {
  setSearchName(payload: string) {
    this.state.searchName = payload;
  }
}

class ParticipantsActions extends Actions<
ParticipantsState,
ParticipantsGetters,
ParticipantsMutations,
ParticipantsActions
> {
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
