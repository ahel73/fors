import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { createDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard } from '@/types/DeedType';

export default class CreateDeedControllerModule {
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
  async fetchCreateDeedController(form: DeedItemCard): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);

    try {
      await createDeedController(form).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно создано',
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
