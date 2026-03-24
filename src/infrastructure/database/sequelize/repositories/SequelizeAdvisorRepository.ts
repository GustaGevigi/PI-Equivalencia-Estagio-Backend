import sequelize from '../../../../config/database';
import { Transaction } from 'sequelize';

import UserModel from '../models/UserModel';

import { IAdvisorRepository } from '../../../../domain/repositories/IAdvisorRepository';
import { Advisor } from '../../../../domain/entities/Advisor';
import AdvisorModel from '../models/AdvisorModel';
import { User } from '../../../../domain/entities/User';

export class SequelizeAdvisorRepository implements IAdvisorRepository {
  private mapToEntity(model: any): Advisor {
    const data = model.toJSON();

    return new Advisor({
      id: data.id,

      name: data.user.name,
      email: data.user.email,
      cpf: data.user.cpf,
      password: data.user.password,
      role: data.user.role,
    });
  }

  async create(advisor: Advisor): Promise<Advisor> {
    return await sequelize.transaction(async (t: Transaction) => {
      try {
        const userCreated = await UserModel.create(
          {
            name: advisor.props.name,
            email: advisor.props.email,
            cpf: advisor.props.cpf,
            password: advisor.props.password,
            role: 'advisor',
          },
          {
            transaction: t,
          },
        );

        await AdvisorModel.create(
          {
            id: userCreated.id,
          },
          {
            transaction: t,
          },
        );

        advisor.props.id = userCreated.id;

        return advisor;
      } catch (error) {
        console.log('Erro na transação do Orientador:', error);
        throw error;
      }
    });
  }

  async findByCpf(cpf: string): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { cpf },
        },
      ],
    });
    return advisor ? this.mapToEntity(advisor) : null;
  }

  async findByEmail(email: string): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { email },
        },
      ],
    });
    return advisor ? this.mapToEntity(advisor) : null;
  }

  async findById(id: number): Promise<Advisor | null> {
    const advisor = await AdvisorModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { id },
        },
      ],
    });
    return advisor ? this.mapToEntity(advisor) : null;
  }
}
