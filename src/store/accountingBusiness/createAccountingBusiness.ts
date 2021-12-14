import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { createDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';

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

  @Mutation()
  setDeedController(response?: any): void {
    const data = response;
    this.state.data = data;
  }

  @Action()
  async fetchCreateDeedController(form: any): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);

    try {
      const data: any = await createDeedController(form).then(() => {
        eventBus.$emit(
          'notification:message',
          {
            text: 'Успешно создано',
            title: 'Выполнено',
            type: 'success',
          }
        );
      });
      this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error as AxiosError);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
