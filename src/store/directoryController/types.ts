import { DocGroup } from '@/types/DocGroup';
import { Employment } from '@/types/Employment';
import { Priority } from '@/types/Priority';
import { ImprovingWay } from '@/types/ImprovingWay';
import { IndividualPersonInfo } from '@/types/IndividualPersonInfo';
import { Oktmo } from '@/types/Oktmo';
import { SpendingDirection } from '@/types/SpendingDirection';
import { Status } from '@/types/Status';
import { AxiosError } from 'axios';

export interface DirectoryControllerStore {
  deedStatus: Status[],
  deedDocGroup: DocGroup[],
  employment: Employment[],
  improvingWay: ImprovingWay[],
  personInfo: [],
  oktmo: Oktmo[],
  priority: Priority[],
  spendingDirection: SpendingDirection[],
  familyPeopleInFamily: [],
  error: AxiosError | null;
  isLoading: boolean;
}
