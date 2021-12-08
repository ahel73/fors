import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { undoRecordAccounting, updateDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';

export default class UndoRecordAccountingModule {
  @State()
  state: DeedControllerItemStore = {
    data: {} as DeedItemCard,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setUndoRecordAccountingIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setUndoRecordAccountingError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
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
  setUndoRecordAccounting(response?: any): void {
    const data = response;
    this.state.data = data;
  }

  @Action()
  async fetchUndoRecordAccounting(params: any): Promise<void> {
    this.setUndoRecordAccountingIsLoading(true);
    this.setUndoRecordAccountingError(null);
    try {
      const data = await undoRecordAccounting(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно снят с учета',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });

      this.setUndoRecordAccounting(data);
    } catch (error) {
      this.setUndoRecordAccountingError(error);
    } finally {
      this.setUndoRecordAccountingIsLoading(false);
    }
  }
}
