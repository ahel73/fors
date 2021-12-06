
import { getOktmoController } from '@/data/services/oktmoController/oktmoContriller';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';
import { OktmoControllerStore } from './types';

export default class OktmoControllerModule {
  @State()
  state: OktmoControllerStore = {
    data: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setOktmoControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setOktmoError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setOktmoController(response: any): void {
    const { data, meta } = response;

    this.state.data = data;
  }

  @Action()
  async fetchOktmoControllerData(params?: any): Promise<void> {
    this.setOktmoControllerIsLoading(true);
    this.setOktmoError(null);
    try {
      const data: any = await getOktmoController(params);

      this.setOktmoController(data);
    } catch (error) {
      this.setOktmoError(error);
    } finally {
      this.setOktmoControllerIsLoading(false);
    }
  }
}
