import { getImprovingWayController } from '@/data/services/improvingWayController/improvingWayController';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { ImprovingWayControllerStore } from './types';

export default class ImprovingWayControllerModule {
  @State()
  state: ImprovingWayControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setImprovingWayControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setImprovingWayControllerError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setImprovingWayController(response: any): void {
    const { data } = response;

    this.state.data = data;
  }

  @Action()
  async fetchImprovingWayController(): Promise<void> {
    this.setImprovingWayControllerIsLoading(true);
    this.setImprovingWayControllerError(null);
    try {
      const data: any = await getImprovingWayController();

      this.setImprovingWayController(data);
    } catch (error) {
      this.setImprovingWayControllerError(error);
    } finally {
      this.setImprovingWayControllerIsLoading(false);
    }
  }
}
