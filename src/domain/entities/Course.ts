export type Shift = 'Matutino' | 'Vespertino' | 'Noturno' | 'Integral';

export interface CourseProps {
  id?: number;
  name: string;
  semesterAmount: number;
  shift: Shift;
  code: string;
  createdByAdminId: number;
}

export class Course {
  constructor(public props: CourseProps) {}
}
