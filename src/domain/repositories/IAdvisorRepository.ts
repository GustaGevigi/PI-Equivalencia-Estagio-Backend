import { Advisor } from '../entities/Advisor';

export interface IAdvisorRepository {
  create(advisor: Advisor): Promise<void>;
  findByEmail(email: string): Promise<Advisor | null>;
  findByCpf(cpf: string): Promise<Advisor | null>;
  findById(id: number): Promise<Advisor | null>;
}
