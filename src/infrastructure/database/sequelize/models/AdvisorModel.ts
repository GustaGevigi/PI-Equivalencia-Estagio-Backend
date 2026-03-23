import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';

interface AdvisorCreationAttributes {
  id: number;
}

class AdvisorModel
  extends Model<AdvisorCreationAttributes>
  implements AdvisorCreationAttributes
{
  public id!: number;
}

AdvisorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  { sequelize, tableName: 'Advisors', timestamps: true },
);

export default AdvisorModel;
