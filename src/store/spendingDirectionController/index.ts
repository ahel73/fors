import { getSpendingDirectionController } from '@/data/services/spendingDirectionController/spendingDirectionController';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { SpendingDirectionControllerStore } from './types';

export default class SpendingDirectionControllerModule {
  @State()
  state: SpendingDirectionControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setDirectionControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setSpendingDirectionError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setDirectionController(response: any): void {
    const { data } = response;

    this.state.data = data;
  }

  @Action()
  async fetchSpendingDirectionController(): Promise<void> {
    this.setDirectionControllerIsLoading(true);
    this.setSpendingDirectionError(null);
    try {
      const data: any = await getSpendingDirectionController();

      this.setDirectionController(data);
    } catch (error) {
      this.setSpendingDirectionError(error);
    } finally {
      this.setDirectionControllerIsLoading(false);
    }
  }
}
