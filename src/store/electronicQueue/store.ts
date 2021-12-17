import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { ElectronicQueueStore } from './types';
import { getElectronicQueue } from '@/data/services/electronicQueue/electronicQueue';

export default class ElectronicQueueModule {
  @State()
  state: ElectronicQueueStore = {
    data: [],
    total: null,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setElectronicQueueIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setElectronicQueueError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setElectronicQueue(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
    this.state.total = meta.total;
  }

  @Action()
  async fetchElectronicQueueData(params?: any): Promise<void> {
    console.log(params, 'params');
    this.setElectronicQueueIsLoading(true);
    this.setElectronicQueueError(null);
    try {
      const data: any = await getElectronicQueue(params);

      this.setElectronicQueue(data);
    } catch (error) {
      this.setElectronicQueueError(error as AxiosError);
    } finally {
      this.setElectronicQueueIsLoading(false);
    }
  }
}
