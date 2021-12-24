import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { onRecordAccounting } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard } from '@/types/AccountBissiness';
import { AccountingType } from '@/types/AccountingType';

export default class RecordAccountingModule {
  @State()
  state: DeedControllerItemStore = {
    data: {} as DeedItemCard,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setRecordAccountingIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setRecordAccountingError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
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
  async recordAccounting(params: AccountingType): Promise<void> {
    this.setRecordAccountingIsLoading(true);
    this.setRecordAccountingError(null);
    try {
      await onRecordAccounting(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно поставлен на учет',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
    } catch (error) {
      this.setRecordAccountingError(error as AxiosError);
    } finally {
      this.setRecordAccountingIsLoading(false);
    }
  }
}
