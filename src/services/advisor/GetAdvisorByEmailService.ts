import { AdvisorProps } from '../../domain/entities/Advisor';
import { IAdvisorRepository } from '../../domain/repositories/IAdvisorRepository';

export class GetAdvisorByEmailService {
  constructor(private advisorRepository: IAdvisorRepository) {}

  async execute(email: string): Promise<AdvisorProps | null> {
    const advisorFound = await this.advisorRepository.findByEmail(email);

    if (!advisorFound) {
      return null;
    }

    return advisorFound.props;
  }
}
