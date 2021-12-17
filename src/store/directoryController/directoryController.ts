import { getDeedStatusController, getDocGroupController, getEmploymentController, getImprovingWayController, getIndividualPersonInfoController, getOktmoController, getQueuePriorityController, getQueueStatusController, getSpendingDirectionController } from '@/data/services/directoryController/directoryController';
import { Status, StatusResponseData } from '@/types/Status';
import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { DirectoryControllerStore } from './types';

export default class DirectoryControllerModule {
  @State()
  state: DirectoryControllerStore = {
    deedStatus: [],
    deedDocGroup: [],
    employment: [],
    improvingWay: [],
    personInfo: [],
    oktmo: [],
    priority: [],
    spendingDirection: [],
    familyPeopleInFamily: [],
    queueStatus: [],
    error: null,
    isLoading: false,
  }

  @Mutation()
  setDirectoryControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setDirectoryControllerError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setStatusController(response: any): void {
    const { data } = response;
    this.state.deedStatus = data;
  }

  @Mutation()
  setDocGroupController(response: any): void {
    const { data } = response;
    this.state.deedDocGroup = data;
  }

  @Mutation()
  setEmploymentController(response: any): void {
    const { data } = response;
    this.state.employment = data;
  }

  @Mutation()
  setImprovingWayController(response: any): void {
    const { data } = response;

    this.state.improvingWay = data;
  }

  @Mutation()
  setPersonInfoController(response: any): void {
    const { data } = response;
    this.state.personInfo = data;
  }

  @Mutation()
  setOktmoController(response: any): void {
    const { data } = response;
    this.state.oktmo = data;
  }

  @Mutation()
  setPriorityController(response: any): void {
    const { data } = response;
    this.state.priority = data;
  }

  @Mutation()
  setDirectionController(response: any): void {
    const { data } = response;

    this.state.spendingDirection = data;
  }

  @Mutation()
  setQueueStatusController(data: Status[]): void {
    this.state.queueStatus = data;
  }

  @Action()
  async fetchQueueStatusController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const { data, meta: { total } }: StatusResponseData = await getQueueStatusController();

      this.setQueueStatusController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchSpendingDirectionController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getSpendingDirectionController();

      this.setDirectionController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchQueuePriorityController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getQueuePriorityController();

      this.setPriorityController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchOktmoControllerData(params?: any): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getOktmoController(params);

      this.setOktmoController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchIndividualPersonInfoController(params?: any): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getIndividualPersonInfoController(params);

      this.setPersonInfoController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchImprovingWayController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getImprovingWayController();

      this.setImprovingWayController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchDeedStatusController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const deedStatus: any = await getDeedStatusController();

      this.setStatusController(deedStatus);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchDocGroupController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const docGroup: any = await getDocGroupController();

      this.setDocGroupController(docGroup);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Action()
  async fetchEmploymentController(): Promise<void> {
    this.setDirectoryControllerIsLoading(true);
    this.setDirectoryControllerError(null);
    try {
      const data: any = await getEmploymentController();

      this.setEmploymentController(data);
    } catch (error) {
      this.setDirectoryControllerError(error as AxiosError);
    } finally {
      this.setDirectoryControllerIsLoading(false);
    }
  }

  @Mutation()
  familyMembers(data: any) {
    this.state.familyPeopleInFamily = data;
  }

  @Action()
  findFamilyMembers(data: any) {
    this.familyMembers(data);
  }
}
