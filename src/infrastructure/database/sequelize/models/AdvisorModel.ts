import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { AdvisorProps } from '../../../../domain/entities/Advisor';

interface AdvisorCreationAttributes extends Optional<AdvisorProps, 'id'> {}

class AdvisorModel
  extends Model<AdvisorProps, AdvisorCreationAttributes>
  implements AdvisorProps
{
  public id!: number;
  public cpf!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}

AdvisorModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
  },
  { sequelize, tableName: 'Advisors', timestamps: true },
);

export default AdvisorModel;
