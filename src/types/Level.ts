export enum LevelCodes {
  MSH ='MSH',
  ROU_APK = 'ROU_APK',
  MOU_APK = 'MOU_APK',
  SHTP = 'SHTP',
}

export type LevelCodesNames = keyof typeof LevelCodes;

// Уровень организации
export type Level = {
  id: number;
  code: LevelCodes;
  name: string;
}
