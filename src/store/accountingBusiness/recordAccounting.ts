import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { onRecordAccounting } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';

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

  @Mutation()
  setRecordAccounting(response?: any): void {
    const data = response;
    this.state.data = data;
  }

  @Action()
  async fetchRecordAccounting(params: any): Promise<void> {
    this.setRecordAccountingIsLoading(true);
    this.setRecordAccountingError(null);
    try {
      const data = await onRecordAccounting(params);

      this.setRecordAccounting(data);
    } catch (error) {
      this.setRecordAccountingError(error);
    } finally {
      this.setRecordAccountingIsLoading(false);
    }
  }
}
