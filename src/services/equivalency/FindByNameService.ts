import {
  Equivalency,
  EquivalencyProps,
} from '../../domain/entities/Equivalency';
import { IEquivalencyRepository } from '../../domain/repositories/IEquivalencyRepository';

export class FindByNameService {
  constructor(private equivalencyRepo: IEquivalencyRepository) {}

  async execute(name: string): Promise<EquivalencyProps | null> {
    const equivalency = await this.equivalencyRepo.findByName(name);

    if (!equivalency) return null;

    return equivalency.props;
  }
}
