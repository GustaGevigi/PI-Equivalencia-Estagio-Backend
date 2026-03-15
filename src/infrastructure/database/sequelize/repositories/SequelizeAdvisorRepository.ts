import { IAdvisorRepository } from '../../../../domain/repositories/IAdvisorRepository';
import { Advisor } from '../../../../domain/entities/Advisor';
import AdvisorModel from '../models/AdvisorModel';

export class SequelizeAdvisorRepository implements IAdvisorRepository {
  async create(advisor: Advisor): Promise<void> {
    await AdvisorModel.create(advisor.props);
  }

  async findByCpf(cpf: string): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({ where: { cpf } });
    return advisor ? new Advisor(advisor.toJSON()) : null;
  }

  async findByEmail(email: string): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({ where: { email } });
    return advisor ? new Advisor(advisor.toJSON()) : null;
  }

  async findById(id: number): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({ where: { id } });
    return advisor ? new Advisor(advisor.toJSON()) : null;
  }
}
