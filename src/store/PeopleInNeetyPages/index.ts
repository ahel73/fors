import { Action, Getter, Mutation, State } from 'vuex-simple';

import { DataPeopleInneety } from './types';

export default class PeopleInNeetyModule {
  @State()
  state: DataPeopleInneety = {
    headers: [],
  }
}
