export interface AdvisorCourseProps {
  id?: number;
  advisorId: number;
  courseId: number;
  expirationDate: Date;
}

export class AdvisorCourse {
  constructor(public props: AdvisorCourseProps) {
    this.validate();
  }

  private validate() {
    if (this.props.expirationDate <= new Date()) {
      throw new Error('A data de expiração deve ser uma data futura!');
    }

    if (this.props.advisorId <= 0 || this.props.courseId <= 0) {
      throw new Error('ID de Orientador ou Curso incorreto!');
    }
  }
}
