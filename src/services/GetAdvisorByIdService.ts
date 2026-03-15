import { AdvisorProps } from '../domain/entities/Advisor';
import { IAdvisorRepository } from '../domain/repositories/IAdvisorRepository';

export class GetAdvisorByIdService {
  constructor(private advisorReposiory: IAdvisorRepository) {}

  async execute(id: number): Promise<AdvisorProps | null> {
    const advisor = await this.advisorReposiory.findById(id);

    if (!advisor) return null;

    return advisor.props;
  }
}
