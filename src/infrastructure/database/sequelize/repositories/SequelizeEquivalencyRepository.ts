import { IEquivalencyRepository } from '../../../../domain/repositories/IEquivalencyRepository';
import {
  Equivalency,
  EquivalencyProps,
} from '../../../../domain/entities/Equivalency';
import EquivalencyModel from '../models/EquivalencyModel';

export class SequelizeEquivalencyRepository implements IEquivalencyRepository {
  async create(equivalency: Equivalency): Promise<void> {
    await EquivalencyModel.create(equivalency.props);
  }

  async findAll(): Promise<Equivalency[]> {
    const equivalenciesFromDb = await EquivalencyModel.findAll();

    return equivalenciesFromDb.map((model) => new Equivalency(model.toJSON()));
  }

  async findByName(name: string): Promise<Equivalency | null> {
    const equivalency = await EquivalencyModel.findOne({ where: { name } });
    return equivalency ? new Equivalency(equivalency.toJSON()) : null;
  }

  async findById(id: number): Promise<Equivalency | null> {
    const equivalency = await EquivalencyModel.findOne({ where: { id } });
    return equivalency ? new Equivalency(equivalency.toJSON()) : null;
  }

  async update(
    id: number,
    data: Partial<EquivalencyProps>,
  ): Promise<Equivalency | null> {
    const equivalency = await EquivalencyModel.findByPk(id);

    if (!equivalency) return null;

    await equivalency.update(data);

    return new Equivalency(equivalency);
  }
}
