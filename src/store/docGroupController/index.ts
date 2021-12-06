import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { getDocGroupController } from '@/data/services/docGroupController/docGroupController';
import { DocGroupControllerStore } from './types';

export default class DocGroupControllerModule {
  @State()
  state: DocGroupControllerStore = {
    data: [],
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
  }

  @Action()
  async fetchDocGroupController(): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getDocGroupController();

      this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
