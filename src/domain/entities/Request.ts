import { DocumentProps } from './Document';
import { ProfessionalExperienceProps } from './ProfessionalExperience';

export type Status = 'Pendente' | 'Reprovado' | 'Aprovado';

export interface RequestProps {
  id?: number;
  advisorId?: number;
  studentId: number;
  equivalencyId: number;
  protocol: string;
  status: Status;
  observation: string;
  Documents?: DocumentProps[];
  Professional_Experience?: ProfessionalExperienceProps[];
}

export class Request {
  constructor(public props: RequestProps) {
    if (this.props.studentId <= 0 || this.props.equivalencyId <= 0) {
      throw new Error('Um ou mais IDs inseridos são inválidos');
    }
  }
}
