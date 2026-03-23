import { User, UserProps } from './User';

export interface AdvisorProps extends UserProps {}

export class Advisor extends User {
  constructor(public override props: AdvisorProps) {
    super({ ...props, role: 'advisor' });
  }
}
