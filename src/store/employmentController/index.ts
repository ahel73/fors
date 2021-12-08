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
  setEmploymentControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setEmploymentControllerError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setEmploymentController(response: any): void {
    const { data } = response;

    this.state.data = data;
  }

  @Action()
  async fetchEmploymentController(): Promise<void> {
    this.setEmploymentControllerIsLoading(true);
    this.setEmploymentControllerError(null);
    try {
      const data: any = await getEmploymentController();

      this.setEmploymentController(data);
    } catch (error) {
      this.setEmploymentControllerError(error);
    } finally {
      this.setEmploymentControllerIsLoading(false);
    }
  }
}
