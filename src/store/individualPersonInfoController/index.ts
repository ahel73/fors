import { getIndividualPersonInfoController } from '@/data/services/individualPersonInfoController/individualPersonInfoController';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { PersonInfoControllerStore } from './types';

export default class IndividualPersonInfoControllerModule {
  @State()
  state: PersonInfoControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setPersonInfoControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setPersonInfoController(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
  }

  @Action()
  async fetchIndividualPersonInfoController(): Promise<void> {
    this.setPersonInfoControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getIndividualPersonInfoController();

      this.setPersonInfoController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setPersonInfoControllerIsLoading(false);
    }
  }
}
