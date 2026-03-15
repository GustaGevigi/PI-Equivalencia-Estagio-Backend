import { Advisor, AdvisorProps } from '../domain/entities/Advisor';
import { IAdvisorRepository } from '../domain/repositories/IAdvisorRepository';

import bcrypt from 'bcrypt';

type AdvisorDTO = Omit<AdvisorProps, 'id'>;

export class CreateAdvisorService {
  constructor(private advisorRepository: IAdvisorRepository) {}

  async execute(advisor: AdvisorDTO) {
    if (await this.advisorRepository.findByEmail(advisor.email)) {
      throw new Error('Email já cadastrado');
    }

    if (await this.advisorRepository.findByEmail(advisor.cpf)) {
      throw new Error('CPF já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(advisor.password, 10);

    const newAdvisor = new Advisor({ ...advisor, password: hashedPassword });

    await this.advisorRepository.create(newAdvisor);

    return newAdvisor;
  }
}
