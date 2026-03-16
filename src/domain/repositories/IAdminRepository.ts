import { Admin } from '../entities/Admin';

export interface IAdminRepository {
  create(admin: Admin): Promise<void>;
  findByEmail(email: string): Promise<Admin | null>;
  findByCpf(cpf: string): Promise<Admin | null>;
  findById(id: number): Promise<Admin | null>;
}
