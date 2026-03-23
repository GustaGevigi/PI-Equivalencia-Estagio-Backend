import sequelize from '../../../../config/database';
import { Transaction, where } from 'sequelize';

import UserModel from '../models/UserModel';

import { Admin } from '../../../../domain/entities/Admin';
import AdminModel from '../models/AdminModel';
import { IAdminRepository } from '../../../../domain/repositories/IAdminRepository';

export class SequelizeAdminRepository implements IAdminRepository {
  private mapToEntity(model: any): Admin {
    const data = model.toJSON();

    return new Admin({
      id: data.id,

      name: data.user.name,
      email: data.user.email,
      cpf: data.user.cpf,
      password: data.user.password,
      role: data.user.role,
    });
  }

  async create(admin: Admin): Promise<Admin> {
    return await sequelize.transaction(async (t: Transaction) => {
      try {
        const userCreated = await UserModel.create(
          {
            name: admin.props.name,
            email: admin.props.email,
            cpf: admin.props.cpf,
            password: admin.props.password,
            role: 'administrator',
          },
          {
            transaction: t,
          },
        );

        await AdminModel.create(
          {
            id: userCreated.id,
          },
          { transaction: t },
        );

        admin.props.id = userCreated.id;

        return admin;
      } catch (error) {
        console.log('Erro na transação do Administrador:', error);
        throw error;
      }
    });
  }

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({
      include: [{ model: UserModel, as: 'user', where: { cpf } }],
    });
    return admin ? this.mapToEntity(admin) : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { email },
        },
      ],
    });
    return admin ? this.mapToEntity(admin) : null;
  }

  async findById(id: number): Promise<Admin | null> {
    const admin = await AdminModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { id },
        },
      ],
    });
    return admin ? this.mapToEntity(admin) : null;
  }
}
