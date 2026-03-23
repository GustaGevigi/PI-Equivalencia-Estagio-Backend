import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';
import UserModel from '../models/UserModel';

export class SequelizeUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });

    return user ? new User(user.toJSON()) : null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { cpf } });
    return user ? new User(user.toJSON()) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user ? new User(user.toJSON()) : null;
  }
}
