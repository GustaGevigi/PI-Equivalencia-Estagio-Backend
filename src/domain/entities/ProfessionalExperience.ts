export interface ProfessionalExperienceProps {
  id?: number;
  role: string;
  cnpj: string;
  startDate: Date;
  endDate?: Date;
  requestId: number;
}

export class ProfessionalExperience {
  constructor(public props: ProfessionalExperience) {}
}
