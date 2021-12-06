import { getQueuePriorityController } from '@/data/services/queuePriorityController/queuePriorityController';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { QueuePriorityControllerStore } from './types';

export default class QueuePriorityControllerModule {
  @State()
  state: QueuePriorityControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setPriorityControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setPriorityController(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
  }

  @Action()
  async fetchQueuePriorityController(): Promise<void> {
    this.setPriorityControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getQueuePriorityController();

      this.setPriorityController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setPriorityControllerIsLoading(false);
    }
  }
}
