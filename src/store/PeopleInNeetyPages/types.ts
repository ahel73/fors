 interface HeaderTablePeopleInNeety {
  text: string,
  value: string,
}

export interface TypeDoc {
  id: string | number,
  name: string,
  active: string | boolean,
}
export interface IdentityDoc {
  id?: number | null,
  individualPersonId?: string | number | null,
  seriesNumber?: string | number | null,
  issueDate: string | null,
  authority: string | null,
  type: TypeDoc | null,
  createUser?: null | string,
  createDate?: string | null,
  changeUser?: null | string,
  changeDate?: null | string,
  active: string | boolean | null,
}

interface StatusPerson {
  id: string | number,
  name: string,
  active: string | boolean,
}

export interface Employer {
  id?: string | number,
  name: string | null,
  shortName: string | null,
  type: any | null,
  pfrRegistrationNumber: string | null,
  subjectId?: string | number | null,
  inn: string | null,
  createUser?: string | number | null,
  createDate?: string,
  changeUser?: string | number | null,
  changeDate?: string | number | null,
  active: string | boolean | null,
}

interface WorkerAction {
  id?: string | number | null,
  individualPersonId?: string | number | null,
  workFunction: string | null,
  employmentDate: string | null,
  dismissalDate: string | null,
  dismissalReason: string | null,
  baseDoc: string | null,
  createUser?: string | boolean | null,
  createDate?: string | null,
  changeUser?: string | boolean | null,
  changeDate?: string | boolean | null,
  checkDate?: string
  checkUser?: string | null,
  pfr: string | boolean | null,
  employer: { id?: string | number, shortName: string } | null
}

export interface PersonNeedy {
  id?: string | number | null,
  surname: string | null,
  name: string | null,
  patronymic: string | null,
  birthDate: string | null,
  sex: string | null,
  residence: string | null,
  location: string | null,
  registrationDate: string | null,
  areaCode: string | null,
  snils: string | null,
  inn: string | null,
  ogrnip: string | null,
  phoneNumber: string | null,
  email: string | null,
  status: StatusPerson | null,
  lkFlId?: string | number | null,
  areacode?: string | number | null,
  createUser?: string | number | null,
  createDate?: string | null,
  changeUser?: string | number | null,
  changeDate?: string | null,
  identityDoc?: IdentityDoc | null, // временно необязательный
  works: WorkerAction[] | [] // временно необязательный
}
export interface UpdatePropsObject {
  name: string | number,
  value: string | null | number,
  object?: string,
}

export interface SaveObj {
  objDoc: IdentityDoc | WorkerAction,
  nameList: string,
}

export interface filterObject {
  surname: null | string,
  name: null | string,
  patronymic: null | string,
  fromBirthDate: null | string,
  toBirthDate: null | string,
  inn: null | string,
  snils: null | string,
  residence: null | string,
  location: null | string,
}

export interface pagAndSortObject {
  page: number,
  size: number,
  sort: string,
  total: number | null,
}
export interface DataPeopleInNeety {
  headerTablePeopleInNeety: HeaderTablePeopleInNeety[] | [],
  listPeopleInNeety: PersonNeedy[] | [],
  newPersonNeedy: PersonNeedy,
  updatePersonNeedy: object | null,
  newIdentityDoc: IdentityDoc,
  newEmployer: Employer,
  newWorkerAction?: WorkerAction,
  flagTabWorker: number,
  flagUpdateItem: boolean,
  flagViewing: boolean,
  flagFirstResponse: boolean,
  yearStart: number,
  filter: filterObject,
  pagAndSort: pagAndSortObject,
  searchLabels: string[] | [],
}
