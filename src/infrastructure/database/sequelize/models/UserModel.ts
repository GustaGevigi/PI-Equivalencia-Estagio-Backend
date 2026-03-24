import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { Role, UserProps } from '../../../../domain/entities/User';

interface UserCreationAttributes extends Optional<UserProps, 'id'> {}

class UserModel
  extends Model<UserProps, UserCreationAttributes>
  implements UserProps
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public role!: Role;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    role: {
      type: DataTypes.ENUM('student', 'advisor', 'administrator'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: true,
  },
);

export default UserModel;
