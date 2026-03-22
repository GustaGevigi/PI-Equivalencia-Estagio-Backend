import { Equivalency } from '../../domain/entities/Equivalency';
import { IEquivalencyRepository } from '../../domain/repositories/IEquivalencyRepository';

export class FindAllService {
  constructor(private equivalencyRepo: IEquivalencyRepository) {}

  async execute(): Promise<Equivalency[]> {
    return await this.equivalencyRepo.findAll();
  }
}
