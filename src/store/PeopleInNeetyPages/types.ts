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
  id: string | number,
  individualPersonId?: string | number,
  workPalceId?: string | number,
  workFunc: string,
  employmentDate: string,
  dismissalDate: string,
  dismissalReason: string,
  baseDoc: string,
  status?: {
      id: string | number,
      name: string,
      active: string | boolean,
  },
  createUser?: string | boolean | null,
  createDate?: string,
  changeUser?: string | boolean | null,
  changeDate?: string | boolean | null,
  checkDate?: string
  checker?: string,
  pfr: string | boolean,
}

interface PersonNeedy {
  id?: string | number,
  surname: string,
  name: string,
  patronymic: string,
  birthDate: string,
  sex?: string, // временно необязательный
  residence: string,
  location?: string, // временно необязательный
  regDate?: string, // временно необязательный
  codMO?: string, // временно необязательный + его нет в структуре от Александра
  snils?: string, // временно необязательный
  inn?: string, // временно необязательный
  ogrnip?: string, // временно необязательный
  phoneNumber?: string, // временно необязательный
  email?: string, // временно необязательный
  status?: StatusPerson, // временно необязательный
  lkFlId?: string | number,
  areacode?: string | number,
  createUser?: string | number | null,
  createDate?: string,
  changeUser?: string | number | null,
  changeDate?: string,
  identityDocs?: IdentityDoc[] | [], // временно необязательный
  works?: WorkerAction[] | [] // временно необязательный
}
export interface UpdatePropsObject {
  name: string | number,
  value: string,
  object: string,
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
  newIdentityDoc: IdentityDoc,
  newEmployer: Employer,
}
