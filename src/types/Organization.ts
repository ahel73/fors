import { HeadType } from './headTypes';
import { OrganizationType } from './OrganizationType';
import { WorkingRegion } from './WorkingRegion';
import { Oktmo } from './Oktmo';
import { OrganizationLevel } from './OrganizationLevel';

export interface Organization {
  orgId: string;
  name: string;
  shortName: string;
  inn: string;
  kpp: string;
  ogrn: string;
  okpo: string;
}

export interface MeOrganization {
  id: number;
  rootId: number;
  guid: string;
  name: string;
  shortName: string;
  type: OrganizationType;
  headType: HeadType;
  level: OrganizationLevel;
  oktmo: Oktmo;
  ogrn: string;
  inn: string;
  opf: string;
  kpp: string;
  agencyTerritory: string;
  agencyType: string;
  email: string;
  phone: string;
  fax: string;
  legalAddress: string;
  postalAddress: string;
  workingRegions: WorkingRegion;
  region: string;
}
