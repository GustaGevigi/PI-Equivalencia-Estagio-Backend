import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';

interface StudentDatabaseAttributes {
  id: number;
  courseId: number;
  rg: string;
  ra: string;
  tel: string;
}

interface StudentCreationAttributes extends Optional<
  StudentDatabaseAttributes,
  'id'
> {}

class StudentModel
  extends Model<StudentDatabaseAttributes, StudentCreationAttributes>
  implements StudentDatabaseAttributes
{
  public id!: number;
  public courseId!: number;
  public rg!: string;
  public ra!: string;
  public tel!: string;
}

StudentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rg: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ra: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    tel: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Students',
    timestamps: true,
  },
);

export default StudentModel;
