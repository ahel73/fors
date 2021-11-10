import { Module, Getters, Mutations, Actions, createMapper } from 'vuex-smart-module';
import {
} from '@/data';
import {
} from '@/types';

class ConfiguratorState {
  searchName = '';
}

class ConfiguratorGetters extends Getters<ConfiguratorState> {
  getSearchName() {
    return this.state.searchName;
  }
}

class ConfiguratorMutations extends Mutations<ConfiguratorState> {
  setSearchName(payload: string) {
    this.state.searchName = payload;
  }
}

class ConfiguratorActions extends Actions<
  ConfiguratorState,
  ConfiguratorGetters,
  ConfiguratorMutations,
  ConfiguratorActions
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

export const configurator = new Module({
  state: ConfiguratorState,
  getters: ConfiguratorGetters,
  mutations: ConfiguratorMutations,
  actions: ConfiguratorActions,
});

export const configuratorMapper = createMapper(configurator);
