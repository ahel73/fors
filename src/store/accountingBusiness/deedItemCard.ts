interface DocGroup {
  id: number,
  name: string,
}

interface Item {
  id: number,
  name: string,
}

interface Person {
  id: number,
  fullName: string,
  birthDate: string,
  identityDoc: string
}

export interface Document {
  acting: boolean,
  docDate: Date,
  docEndDate: Date,
  docGroup: DocGroup,
  docNum: string,
  file: File
  name: string,
  note: string,
  index: string,
  id: string,
}

interface IdentityDoc {
    id: number,
    seriesNum: string,
    typeName: string
}

interface PersonInfo {
  id: number,
  fullName: string,
  birthDate: string,
  identityDoc: IdentityDoc
}

export interface FamilyMembers {
  id: number,
  deedId: number,
  relationship: string,
  changeUser: string,
  createUser: string,
  changeDate: string,
  createDate: string,
  index: string,
  personInfo: PersonInfo
}

export interface DeedItemCard {
  documents: Document[],
  familyMembers: FamilyMembers[],
  applicant: Person,
  area: number,
  changeDate: string,
  changeReason: string,
  changeUser: string,
  createDate: string,
  createUser: string
  employment: Item,
  id: number
  improvingWay: Item,
  oktmo: Item,
  queuePriority: Item,
  registrationDate: string
  spendingDirection: Item,
  status: Item,
  subjectId: number
}
