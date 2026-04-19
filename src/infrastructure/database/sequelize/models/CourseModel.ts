import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { CourseProps, Shift } from '../../../../domain/entities/Course';

interface CourseCreationAttributes extends Optional<CourseProps, 'id'> {}

class CourseModel
  extends Model<CourseCreationAttributes, CourseProps>
  implements CourseProps
{
  public id!: number;
  public name!: string;
  public semesterAmount!: number;
  public shift!: Shift;
  public code!: string;
  public createdByAdminId!: number;
}

CourseModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    semesterAmount: { type: DataTypes.INTEGER, allowNull: false },
    shift: { type: DataTypes.STRING(20), allowNull: false, unique: false },
    code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    createdByAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Administrators', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  },
  { sequelize, tableName: 'Courses', timestamps: true },
);

export default CourseModel;
