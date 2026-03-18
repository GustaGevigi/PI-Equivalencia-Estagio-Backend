import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { StudentProps } from '../../../../domain/entities/Student';

interface StudentCreationAttributes extends Optional<StudentProps, 'id'> {}

class StudentModel
  extends Model<StudentProps, StudentCreationAttributes>
  implements StudentProps
{
  public id!: number;
  public courseId!: number;
  public cpf!: string;
  public rg!: string;
  public ra!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public tel!: string;
}

StudentModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
    rg: { type: DataTypes.STRING(20), allowNull: false },
    ra: { type: DataTypes.STRING(20), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    tel: { type: DataTypes.STRING(20), allowNull: false },
  },
  {
    sequelize,
    tableName: 'Students',
    timestamps: true,
  },
);

export default StudentModel;
