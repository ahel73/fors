import { Organization } from '@/types/Organization';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  organization: Organization | null;
  position: string;
  phone: string;
  email: string;
  region: string;
  level?: string;
}
