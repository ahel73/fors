import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { undoRecordAccounting } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard } from '@/types/DeedType';
import { UndoRecordAccounting } from '@/types/AccountingType';

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

  @Action()
  async undoRecordAccounting(params: UndoRecordAccounting): Promise<void> {
    this.setUndoRecordAccountingIsLoading(true);
    this.setUndoRecordAccountingError(null);
    try {
      await undoRecordAccounting(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно снят с учета',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
    } catch (error) {
      this.setUndoRecordAccountingError(error as AxiosError);
    } finally {
      this.setUndoRecordAccountingIsLoading(false);
    }
  }
}
