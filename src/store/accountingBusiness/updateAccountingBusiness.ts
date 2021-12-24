import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { updateDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard } from '@/types/DeedType';

export default class UpdateDeedControllerModule {
  @State()
  state: DeedControllerItemStore = {
    data: {} as DeedItemCard,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setUpdateDeedControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setUpdateBudgetsError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
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
  async fetchUpdateDeedController(params: DeedItemCard): Promise<void> {
    this.setUpdateDeedControllerIsLoading(true);
    this.setUpdateBudgetsError(null);
    try {
      await updateDeedController(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно обновлено',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
    } catch (error) {
      this.setUpdateBudgetsError(error as AxiosError);
    } finally {
      this.setUpdateDeedControllerIsLoading(false);
    }
  }
}
