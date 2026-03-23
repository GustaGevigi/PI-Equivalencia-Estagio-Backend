import { User, UserProps } from './User';

export interface AdminProps extends UserProps {}

export class Admin extends User {
  constructor(public override props: AdminProps) {
    super({ ...props, role: 'administrator' });
  }
}
