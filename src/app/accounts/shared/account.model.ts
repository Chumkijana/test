import { Workplace } from '../../workplaces/shared/workplace.model';

export interface Account {
  id: number;
  email: string;
  name: string;
  role: string;
  workplaces: Workplace[];
  avatar: string;
  company: any;
}
