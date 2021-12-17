import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { ElectronicQueueStore } from './types';
import { getElectronicQueue, postApplicantQueueArchive } from '@/data/services/electronicQueue/electronicQueue';
import eventBus from '@/utils/bus/event-bus';
import { StateElectronicQueueData, StateElectronicQueueDataParams } from '@/types/ElectronicQueueDataItem';

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
  setElectronicQueueError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
    this.state.error = error;
    if (error?.isAxiosError) {
      const { response } = error as AxiosError;
      eventBus.$emit(
        'notification:message',
        {
          text: response?.data.message ?? fallbackMessage,
          title: 'Ошибка',
          type: 'error',
        }
      );
    }
  }

  @Mutation()
  setElectronicQueue(response: StateElectronicQueueData): void {
    const { data, meta } = response;
    this.state.data = data;
    this.state.total = meta.total;
  }

  @Action()
  async fetchElectronicQueueData(params?: StateElectronicQueueDataParams): Promise<void> {
    this.setElectronicQueueIsLoading(true);
    this.setElectronicQueueError(null);
    try {
      const data: StateElectronicQueueData = await getElectronicQueue(params);

      this.setElectronicQueue(data);
    } catch (error) {
      this.setElectronicQueueError(error as AxiosError);
    } finally {
      this.setElectronicQueueIsLoading(false);
    }
  }

  @Action()
  async fetchElectronicQueueArchive(params: number[]): Promise<void> {
    this.setElectronicQueueIsLoading(true);
    this.setElectronicQueueError(null);
    try {
      await postApplicantQueueArchive(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно добавлено в архив',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
    } catch (error) {
      this.setElectronicQueueError(error as AxiosError);
    } finally {
      this.setElectronicQueueIsLoading(false);
    }
  }
}
