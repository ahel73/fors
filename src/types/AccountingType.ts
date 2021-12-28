export interface AccountingType {
  deedId: string | number,
  registrationDate: Date | string,
}

export interface UndoRecordAccounting {
  deedId: string | number,
  changeReason: string,
}
