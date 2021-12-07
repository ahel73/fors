import { getEmploymentController } from '@/data/services/employmentController/employmentControler';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { EmploymentControllerStore } from './types';

export default class EmploymentControllerModule {
  @State()
  state: EmploymentControllerStore = {
    data: [],
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

  @Mutation()
  setDeedController(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
  }

  @Action()
  async fetchEmploymentController(): Promise<void> {
    this.setDeedControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getEmploymentController();

      this.setDeedController(data);
    } catch (error) {
      this.setBudgetsError(error);
    } finally {
      this.setDeedControllerIsLoading(false);
    }
  }
}
