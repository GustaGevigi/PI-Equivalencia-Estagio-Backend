import { IAdminRepository } from '../../../../domain/repositories/IAdminRepository';
import { Admin } from '../../../../domain/entities/Admin';
import AdminModel from '../models/AdminModel';

export class SequelizeAdminRepository implements IAdminRepository {
  async create(admin: Admin): Promise<void> {
    await AdminModel.create(admin.props);
  }

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ where: { cpf } });
    return admin ? new Admin(admin.toJSON()) : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ where: { email } });
    return admin ? new Admin(admin.toJSON()) : null;
  }

  async findById(id: number): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ where: { id } });
    return admin ? new Admin(admin.toJSON()) : null;
  }
}
