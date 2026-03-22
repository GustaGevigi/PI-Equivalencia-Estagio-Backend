import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { EquivalencyProps } from '../../../../domain/entities/Equivalency';

interface EquivalencyTypeCreationAttributes extends Optional<
  EquivalencyProps,
  'id'
> {}

class EquivalencyModel
  extends Model<EquivalencyTypeCreationAttributes, EquivalencyProps>
  implements EquivalencyProps
{
  public id!: number;
  public name!: string;
  public description!: string;
}

EquivalencyModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: 'Equivalency Types', timestamps: true },
);

export default EquivalencyModel;
