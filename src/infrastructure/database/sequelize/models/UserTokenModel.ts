import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { UserTokenProps } from '../../../../domain/entities/UserToken';

interface UserTokenCreationAttributes extends Optional<UserTokenProps, 'id'> {}

class UserTokenModel
  extends Model<UserTokenProps, UserTokenCreationAttributes>
  implements UserTokenProps
{
  public id!: number;
  public token!: string;
  public userId!: number;
  public expiresAt!: Date;
}

UserTokenModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING(500), allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Users', key: 'id' },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expirationDate',
    },
  },
  {
    sequelize,
    tableName: 'Tokens',
    timestamps: true,
  },
);

export default UserTokenModel;
