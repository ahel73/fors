import httpClient from '@/data/http';
import { DocGroupResponse, DocGroupResponseData } from '@/types/DocGroup';
import { EmploymentResponse, EmploymentResponseData } from '@/types/Employment';
import { ImprovingWayResponse, ImprovingWayResponseData } from '@/types/ImprovingWay';
import { IndividualPersonInfoResponse, IndividualPersonResponseData } from '@/types/IndividualPersonInfo';
import { OktmoResponse, OktmoResponseData } from '@/types/OktmoResponseData';
import { PriorityResponse, PriorityResponseData } from '@/types/Priority';
import { SpendingDirectionResponse, SpendingDirectionResponseData } from '@/types/SpendingDirection';
import { StatusResponse, StatusResponseData } from '@/types/Status';

export const getDeedStatusController = async (): Promise<StatusResponseData> => {
  const { data } = await httpClient.post<StatusResponse>('/deed-statuses/find');
  return data;
};

export const getDocGroupController = async (): Promise<DocGroupResponseData> => {
  const { data } = await httpClient.post<DocGroupResponse>('/doc-groups/find');
  return data;
};

export const getEmploymentController = async (): Promise<EmploymentResponseData> => {
  const { data } = await httpClient.post<EmploymentResponse>('/employments/find');
  return data;
};

export const getImprovingWayController = async (): Promise<ImprovingWayResponseData> => {
  const { data } = await httpClient.post<ImprovingWayResponse>('/improving-ways/find');

  return data;
};

export const getIndividualPersonInfoController = async (params?: any): Promise<IndividualPersonResponseData> => {
  const { data } = await httpClient.post<IndividualPersonInfoResponse>('/individual-person-infos/find', params);
  return data;
};

export const getOktmoController = async (params: any): Promise<OktmoResponseData> => {
  const filter = { regionCode: 20 };
  const { data } = await httpClient.post<OktmoResponse>('/oktmo/find', filter);
  return data;
};

export const getQueuePriorityController = async (): Promise<PriorityResponseData> => {
  const { data } = await httpClient.post<PriorityResponse>('/queue-priorities/find');
  return data;
};

export const getSpendingDirectionController = async (): Promise<SpendingDirectionResponseData> => {
  const { data } = await httpClient.post<SpendingDirectionResponse>('/spending-directions/find');
  return data;
};
