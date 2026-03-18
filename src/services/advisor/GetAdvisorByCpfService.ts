import { AdvisorProps } from '../domain/entities/Advisor';
import { IAdvisorRepository } from '../domain/repositories/IAdvisorRepository';

export class GetAdvisorByCpfService {
  constructor(private advisorRepository: IAdvisorRepository) {}

  async execute(cpf: string): Promise<AdvisorProps | null> {
    const advisorFound = await this.advisorRepository.findByCpf(cpf);

    if (!advisorFound) {
      return null;
    }

    return advisorFound.props;
  }
}
