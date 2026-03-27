import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../../config/database';
import { DocumentProps } from '../../../../domain/entities/Document';

interface DocumentCreationAttributes extends Optional<DocumentProps, 'id'> {}

class DocumentModel
  extends Model<DocumentCreationAttributes, DocumentProps>
  implements DocumentProps
{
  public id!: number;
  public requestId!: number;
  public path!: string;
}

DocumentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Documents',
    timestamps: true,
    underscored: false,
  },
);

export default DocumentModel;
