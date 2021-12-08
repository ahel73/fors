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
  setDocGroupControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setDocGroupControllerError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setDocGroupController(response: any): void {
    const { data } = response;

    this.state.data = data;
  }

  @Action()
  async fetchDocGroupController(): Promise<void> {
    this.setDocGroupControllerIsLoading(true);
    this.setDocGroupControllerError(null);
    try {
      const data: any = await getDocGroupController();

      this.setDocGroupController(data);
    } catch (error) {
      this.setDocGroupControllerError(error);
    } finally {
      this.setDocGroupControllerIsLoading(false);
    }
  }
}
