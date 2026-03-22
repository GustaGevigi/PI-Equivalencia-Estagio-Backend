import { Equivalency, EquivalencyProps } from '../entities/Equivalency';

export interface IEquivalencyRepository {
  create(equivalencyType: Equivalency): Promise<void>;
  findAll(): Promise<Equivalency[]>;
  findByName(name: string): Promise<Equivalency | null>;
  findById(id: number): Promise<Equivalency | null>;
  update(
    id: number,
    data: Partial<EquivalencyProps>,
  ): Promise<Equivalency | null>;
}
