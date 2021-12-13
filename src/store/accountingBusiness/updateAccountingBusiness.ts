import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { updateDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';

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

  @Mutation()
  setUpdateDeedController(response?: any): void {
    const data = response;
    this.state.data = data;
  }

  @Action()
  async fetchUpdateDeedController(params: any): Promise<void> {
    this.setUpdateDeedControllerIsLoading(true);
    this.setUpdateBudgetsError(null);
    try {
      const data = await updateDeedController(params).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно обновлено',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });

      this.setUpdateDeedController(data);
    } catch (error) {
      this.setUpdateBudgetsError(error);
    } finally {
      this.setUpdateDeedControllerIsLoading(false);
    }
  }
}
