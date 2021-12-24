import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { deleteDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard } from '@/types/DeedType';

export default class DeleteDeedControllerModule {
  @State()
  state: DeedControllerItemStore = {
    data: {} as DeedItemCard,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setDeedControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
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
  async fetchDeleteDeedController(params: string | number): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      await deleteDeedController(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно удалено',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
    } catch (error) {
      this.setBudgetsError(error as AxiosError);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
