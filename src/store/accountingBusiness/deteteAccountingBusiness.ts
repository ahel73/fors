import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { deleteDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';

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

  /*  @Mutation()
  setDeedController(response?: any): void {
    const data = response;
    this.state.data = data;
  } */

  @Action()
  async fetchDeleteDeedController(params?: any): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await deleteDeedController(params);

      // this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error as AxiosError);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
