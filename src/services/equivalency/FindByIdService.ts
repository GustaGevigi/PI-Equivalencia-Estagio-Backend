import {
  Equivalency,
  EquivalencyProps,
} from '../../domain/entities/Equivalency';
import { IEquivalencyRepository } from '../../domain/repositories/IEquivalencyRepository';

export class FindByIdService {
  constructor(private equivalencyRepo: IEquivalencyRepository) {}

  async execute(id: number): Promise<EquivalencyProps | null> {
    const equivalency = await this.equivalencyRepo.findById(id);

    if (!equivalency) return null;

    return equivalency.props;
  }
}
