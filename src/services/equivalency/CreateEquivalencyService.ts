import {
  Equivalency,
  EquivalencyProps,
} from '../../domain/entities/Equivalency';
import { IEquivalencyRepository } from '../../domain/repositories/IEquivalencyRepository';

type EquivalencyDTO = Omit<EquivalencyProps, 'id'>;

export class CreateEquivalencyService {
  constructor(private equivalencyRepo: IEquivalencyRepository) {}

  async execute(equivalency: EquivalencyDTO) {
    const existingEquivalency = await this.equivalencyRepo.findByName(
      equivalency.name,
    );

    if (existingEquivalency) {
      throw new Error(
        'Já existe um tipo de equivalência com esse nome. Por favor, escolha um nome diferente.',
      );
    }

    await this.equivalencyRepo.create(new Equivalency(equivalency));
    return new Equivalency(equivalency);
  }
}
