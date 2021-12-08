import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { getDeedStatusController } from '@/data/services/deedStatusController/deedStatusController';
import { DeedStatusControllerStore } from './types';

export default class DeedStatusControllerModule {
  @State()
  state: DeedStatusControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setStatusControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setStatusController(response: any): void {
    const { data } = response;

    this.state.data = data;
  }

  @Action()
  async fetchDeedStatusController(): Promise<void> {
    this.setStatusControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getDeedStatusController();

      this.setStatusController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setStatusControllerIsLoading(false);
    }
  }
}
