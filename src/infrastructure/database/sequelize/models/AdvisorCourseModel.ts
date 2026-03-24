import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { AdvisorCourseProps } from '../../../../domain/entities/AdvisorCourse';

interface AdvisorCourseCreationAttributes extends Optional<
  AdvisorCourseProps,
  'id'
> {}

class AdvisorCourseModel
  extends Model<AdvisorCourseProps, AdvisorCourseCreationAttributes>
  implements AdvisorCourseProps
{
  public id!: number;
  public advisorId!: number;
  public courseId!: number;
  public expirationDate!: Date;
}

AdvisorCourseModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    advisorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Advisors', key: 'id' },
    },
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Courses', key: 'id' },
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expirationDate',
    },
  },
  {
    sequelize,
    tableName: 'AdvisorCourse',
    timestamps: true,
    indexes: [{ unique: true, fields: ['advisorId', 'courseId'] }],
  },
);

export default AdvisorCourseModel;
