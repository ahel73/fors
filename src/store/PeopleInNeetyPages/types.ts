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
  id?: string | number,
  individualPersonId?: string | number,
  seriesNum?: string | number,
  issueDate: string,
  authority: string,
  type: TypeDoc | null,
  createUser?: null | string,
  createDate?: string,
  changeUser?: null | string,
  changeDate?: null | string,
  active: string | boolean,
}

interface StatusPerson {
  id: string | number,
  name: string,
  active: string | boolean,
}

export interface Employer {
  id?: string | number,
  name: string,
  type: string,
  pfrRegNum: string,
  subjectId?: string | number,
  createUser?: string | number | null,
  createDate?: string,
  changeUser?: string | number | null,
  changeDate?: string | number | null,
  active: string | boolean,
}

interface WorkerAction {
  id?: string | number,
  individualPersonId?: string | number,
  workFunction: string,
  employmentDate: string,
  dismissalDate: string,
  dismissalReason: string,
  baseDoc?: string,
  createUser?: string | boolean | null,
  createDate?: string,
  changeUser?: string | boolean | null,
  changeDate?: string | boolean | null,
  checkDate?: string
  checkUser?: string | null,
  pfr: string | boolean,
  employer: { id?: string | number, shortName: string } | null
}

export interface PersonNeedy {
  id?: string | number | null,
  surname: string | null,
  name: string | null,
  patronymic: string | null,
  birthDate: string | null,
  sex?: string | null, // временно необязательный
  residence: string | null,
  location?: string | null, // временно необязательный
  registrationDate?: string | null, // временно необязательный
  areaCode?: string | null, // временно необязательный + его нет в структуре от Александра
  snils?: string | null, // временно необязательный
  inn?: string | null, // временно необязательный
  ogrnip?: string, // временно необязательный
  phoneNumber?: string, // временно необязательный
  email?: string | null, // временно необязательный
  status?: StatusPerson | null, // временно необязательный
  lkFlId?: string | number | null,
  areacode?: string | number | null,
  createUser?: string | number | null,
  createDate?: string | null,
  changeUser?: string | number | null,
  changeDate?: string | null,
  identityDoc?: IdentityDoc | null, // временно необязательный
  works?: WorkerAction[] | [] // временно необязательный
}
export interface UpdatePropsObject {
  name: string | number,
  value: string,
  object?: string,
}

export interface SaveObj {
  objDoc: any,
  nameList: string,
}
export interface DataPeopleInNeety {
  headerTablePeopleInNeety: HeaderTablePeopleInNeety[] | [],
  listPeopleInNeety: PersonNeedy[] | [],
  listEmployers: Employer[] | [],
  newPersonNeedy: PersonNeedy,
  updatePersonNeedy: any,
  newIdentityDoc: IdentityDoc,
  newEmployer: Employer,
  newWorkerAction?: WorkerAction,
}
