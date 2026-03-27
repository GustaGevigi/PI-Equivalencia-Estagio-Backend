import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { ProfessionalExperienceProps } from '../../../../domain/entities/ProfessionalExperience';

interface ProfessionalExperienceCreationAttributes extends Optional<
  ProfessionalExperienceProps,
  'id'
> {}

class ProfessionalExperienceModel
  extends Model<
    ProfessionalExperienceCreationAttributes,
    ProfessionalExperienceProps
  >
  implements ProfessionalExperienceProps
{
  public id!: number;
  public role!: string;
  public cnpj!: string;
  public startDate!: Date;
  public endDate!: Date;
  public requestId!: number;
}

ProfessionalExperienceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Requests',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'Professional_Expriences',
    underscored: false,
  },
);

export default ProfessionalExperienceModel;
