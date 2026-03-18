export interface StudentProps {
  id?: number;
  courseId: number;
  cpf: string;
  rg: string;
  ra: string;
  name: string;
  email: string;
  password: string;
  tel: string;
}

export class Student {
  constructor(public props: StudentProps) {}
}
