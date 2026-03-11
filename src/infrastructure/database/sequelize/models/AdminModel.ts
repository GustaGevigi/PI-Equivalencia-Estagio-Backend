import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { AdminProps } from '../../../../domain/entities/Admin';

interface AdminCreationAttributes extends Optional<AdminProps, 'id'> {}

class AdminModel
  extends Model<AdminProps, AdminCreationAttributes>
  implements AdminProps
{
  public id!: number;
  public cpf!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}
