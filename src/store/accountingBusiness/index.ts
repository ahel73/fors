import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { getDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerStore } from './types';

export default class DeedControllerModule {
  @State()
  state: DeedControllerStore = {
    data: [],
    total: null,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setDeedControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setDeedController(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
    this.state.total = meta.total;
  }

  @Action()
  async fetchDeedControllerData(params?: any): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getDeedController(params);

      this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
