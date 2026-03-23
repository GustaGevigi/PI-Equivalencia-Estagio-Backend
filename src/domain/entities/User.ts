export type Role = 'student' | 'advisor' | 'administrator';

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  role: Role;
}

export class User {
  constructor(public props: UserProps) {}
}
