import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { createDeedController } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedItemCard } from './typesDeedItem';
import { DeedControllerItemStore } from './typesItem';

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
  setBudgetsError(error: AxiosError | null): void {
    this.state.error = error;
  }

  /* @Mutation()
  setDeedController(response?: any): void {
    const data = response;
    this.state.data = data;
  } */

  @Action()
  async fetchCreateDeedController(form: any, familly: any, document: any): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    form.familyMembers = familly;
    form.documents = document;
    console.log(form, 'ggg');
    try {
      const data: any = await createDeedController(form);
      // this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
