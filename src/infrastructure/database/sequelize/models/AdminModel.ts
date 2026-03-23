import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { AdminProps } from '../../../../domain/entities/Admin';

interface AdminCreationAttributes {
  id: number;
}

class AdminModel
  extends Model<AdminCreationAttributes>
  implements AdminCreationAttributes
{
  public id!: number;
}

AdminModel.init(
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
  { sequelize, tableName: 'Administrators', timestamps: true },
);

export default AdminModel;
