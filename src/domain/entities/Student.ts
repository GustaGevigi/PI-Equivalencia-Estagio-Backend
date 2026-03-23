import { User, UserProps } from './User';

export interface StudentProps extends UserProps {
  courseId: number;
  rg: string;
  ra: string;
  tel: string;
}

export class Student extends User {
  constructor(public override props: StudentProps) {
    super({ ...props, role: 'student' });
  }
}
