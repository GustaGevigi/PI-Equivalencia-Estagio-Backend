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

AdminModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
  },
  { sequelize, tableName: 'Advisors', timestamps: true },
);

export default AdminModel;
