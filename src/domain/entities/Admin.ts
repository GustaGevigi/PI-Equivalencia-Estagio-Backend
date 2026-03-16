export interface AdminProps {
  id?: number;
  cpf: string;
  name: string;
  email: string;
  password: string;
}

export class Admin {
  constructor(public props: AdminProps) {}
}
