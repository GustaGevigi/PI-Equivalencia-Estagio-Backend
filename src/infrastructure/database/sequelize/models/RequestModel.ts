import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  DataTypes,
} from 'sequelize';
import sequelize from '../../../../config/database';
import DocumentModel from './DocumentModel';
import ProfessionalExperienceModel from './ProfessionalExperienceModel';

class RequestModel extends Model<
  InferAttributes<RequestModel>,
  InferCreationAttributes<RequestModel>
> {
  declare id: CreationOptional<number>;
  declare protocol: string;
  declare status: CreationOptional<string>;
  declare observation: CreationOptional<string | null>;

  declare studentId: number;
  declare advisorId: CreationOptional<number | null>;
  declare equivalencyId: number;

  // Associações (NonAttribute diz ao Sequelize para não procurar essas colunas no init)
  declare Documents?: NonAttribute<DocumentModel[]>;
  declare Professional_Experience?: NonAttribute<ProfessionalExperienceModel[]>;
}

RequestModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    protocol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    status: {
      // Usando o Enum do Sequelize para bater com seu domínio
      type: DataTypes.ENUM('Pendente', 'Reprovado', 'Aprovado'),
      allowNull: false,
      defaultValue: 'Pendente',
    },
    observation: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Students', key: 'id' },
    },
    advisorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Advisors', key: 'id' },
    },
    equivalencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Equivalency Types', key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'Requests',
    timestamps: true,
  },
);

export default RequestModel;
