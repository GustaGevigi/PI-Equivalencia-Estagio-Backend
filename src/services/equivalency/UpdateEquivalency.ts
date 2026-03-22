import {
  Equivalency,
  EquivalencyProps,
} from '../../domain/entities/Equivalency';
import { IEquivalencyRepository } from '../../domain/repositories/IEquivalencyRepository';

export class UpdateEquivalency {
  constructor(private equivalencyRepo: IEquivalencyRepository) {}

  async execute(
    id: number,
    data: Partial<EquivalencyProps>,
  ): Promise<Equivalency> {
    const exists = await this.equivalencyRepo.findById(id);

    if (!exists) {
      throw new Error('Tipo de equivalência não encontrado.');
    }

    if (data.name) {
      const alreadyUsed = await this.equivalencyRepo.findByName(data.name);

      if (alreadyUsed && alreadyUsed.props.id !== id) {
        throw new Error('Já exite outro tipo de equivalência com este nome.');
      }
    }

    const updated = await this.equivalencyRepo.update(id, data);

    if (!updated) throw new Error('Erro ao atualizar registro.');

    return updated;
  }
}
