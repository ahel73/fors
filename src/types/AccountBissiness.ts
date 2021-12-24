import { AxiosResponse } from 'axios';
import { Meta } from './Meta';
import { Pagination } from './Pagination';

interface DocGroup {
  id: number,
  name: string,
}

interface IdentityDoc {
  id: number,
  seriesNum: string,
  typeName: string
}

interface Item {
  id: number,
  name: string,
}

interface PersonInfo {
  id: number,
  fullName: string,
  birthDate: string,
  identityDoc: IdentityDoc
}

export interface Person {
  birthDate: string,
  changeUser: string,
  createUser: string,
  id?: string | number,
  identityDoc: {
    identityDoc: string,
  }
  index?: number | string,
  individualPerson: PersonInfo,
  personInfo: PersonInfo,
  relationship: string,
}

export interface DocumentItem {
  active: boolean,
  docDate: Date,
  docEndDate: Date,
  docGroup: DocGroup,
  docNum: string,
  file: File
  name: string,
  note: string,
  index?: string | number,
  id?: string | number,
  changeDate: string,
  changeUser: string,
  createDate: string,
  createUser: null
  deedId: number,
  estateObjectId: string,
  fileName: string | any[],
  fileUid: string,
}

export interface FamilyMembers {
  deedId: number,
  changeUser: string,
  createUser: string,
  changeDate: string,
  createDate: string,
  birthDate: string,
  id?: string | number,
  identityDoc: {
    identityDoc: string,
  }
  index?: number | string,
  individualPerson: PersonInfo,
  personInfo: PersonInfo,
  relationship: string,
}

export interface DeedItemCard {
  documents: DocumentItem[],
  familyMembers: FamilyMembers[],
  applicant: PersonInfo,
  area: number,
  changeDate: string,
  changeReason: string,
  changeUser: string,
  createDate: string,
  createUser: string
  employment: Item,
  id: number | string,
  improvingWay: Item,
  oktmo: Item,
  queuePriority: Item,
  registrationDate: string,
  spendingDirection: Item,
  status: Item,
  subjectId: number
}

export interface Filter {
  applicantId: number | null,
  employmentId: number | null,
  groupNum: number | null,
  improvingWayId: number | null,
  queuePriorityId: number | null,
  statusId: number | null,
}

export interface StateDeedData extends Meta {
  data: DeedItemCard[];
}

export interface StateDeedDataParams extends Partial<Pagination> {
  filter?: Filter;
}

export type StateDeed = AxiosResponse<StateDeedData>;
