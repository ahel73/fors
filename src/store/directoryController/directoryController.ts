import { getDeedStatusController, getDocGroupController, getEmploymentController, getImprovingWayController, getIndividualPersonInfoController, getOktmoController, getQueuePriorityController, getSpendingDirectionController } from '@/data/services/directoryController/directoryController';
import { DocGroup, DocGroupResponseData } from '@/types/DocGroup';
import { Employment, EmploymentResponseData } from '@/types/Employment';
import { Priority, PriorityResponseData } from '@/types/Employment copy';
import { ImprovingWay, ImprovingWayResponseData } from '@/types/ImprovingWay';
import { IndividualPersonInfo, IndividualPersonResponseData } from '@/types/IndividualPersonInfo';
import { Oktmo } from '@/types/Oktmo';
import { OktmoResponseData } from '@/types/OktmoResponseData';
import { SpendingDirection, SpendingDirectionResponseData } from '@/types/SpendingDirection';
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
  setStatusController(data: Status[]): void {
    this.state.deedStatus = data;
  }

  @Mutation()
  setDocGroupController(data: DocGroup[]): void {
    this.state.deedDocGroup = data;
  }

  @Mutation()
  setEmploymentController(data: Employment[]): void {
    this.state.employment = data;
  }

  @Mutation()
  setImprovingWayController(data: ImprovingWay[]): void {
    this.state.improvingWay = data;
  }

  @Mutation()
  setPersonInfoController(data: any): void {
    this.state.personInfo = data;
  }

  @Mutation()
  setOktmoController(data: Oktmo[]): void {
    this.state.oktmo = data;
  }

  @Mutation()
  setPriorityController(data: Priority[]): void {
    this.state.priority = data;
  }

  @Mutation()
  setDirectionController(data: SpendingDirection[]): void {
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
      const { data, meta: { total } }: SpendingDirectionResponseData = await getSpendingDirectionController();

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
      const { data, meta: { total } }: PriorityResponseData = await getQueuePriorityController();

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
      const { data, meta: { total } }: OktmoResponseData = await getOktmoController(params);

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
      const { data, meta: { total } }: IndividualPersonResponseData = await getIndividualPersonInfoController(params);

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
      const { data, meta: { total } }: ImprovingWayResponseData = await getImprovingWayController();

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
      const { data, meta: { total } }: StatusResponseData = await getDeedStatusController();

      this.setStatusController(data);
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
      const { data, meta: { total } }: DocGroupResponseData = await getDocGroupController();

      this.setDocGroupController(data);
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
      const { data, meta: { total } }: EmploymentResponseData = await getEmploymentController();

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
