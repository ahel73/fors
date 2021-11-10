import { AxiosError } from 'axios';
import { fetchMe } from '@/data/services/security/me';
import { Person } from '@/types/Person';
import { Action, Mutation, State } from 'vuex-simple';
import { MeState, MeModel } from './types';

export default class MeModule implements MeModel {
  @State()
  state: MeState = {
    data: null,
    error: null,
    loading: false,
  }

  @Mutation()
  setMeError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setMeData(payload: Person): void {
    this.state.data = payload;
  }

  @Mutation()
  setMeLoading(loading: boolean): void {
    this.state.loading = loading;
  }

  @Action()
  fetchMe = async (): Promise<void> => {
    this.setMeLoading(true);
    this.setMeError(null);
    try {
      const data = await fetchMe();

      this.setMeData(data);
    } catch (error) {
      this.setMeError(error as AxiosError);
    } finally {
      this.setMeLoading(false);
    }
  }
}
