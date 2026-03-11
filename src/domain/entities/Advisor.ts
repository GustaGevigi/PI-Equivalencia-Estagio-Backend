export interface AdvisorProps {
  id?: number;
  cpf: string;
  name: string;
  email: string;
  password: string;
}

export class Advisor {
  constructor(public props: AdvisorProps) {}
}
