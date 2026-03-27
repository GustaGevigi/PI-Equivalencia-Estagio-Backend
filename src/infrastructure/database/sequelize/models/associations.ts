import UserModel from '../models/UserModel';
import StudentModel from '../models/StudentModel';
import AdminModel from '../models/AdminModel';
import AdvisorModel from '../models/AdvisorModel';
import CourseModel from '../models/CourseModel';
import EquivalencyModel from '../models/EquivalencyModel';
import AdvisorCourseModel from '../models/AdvisorCourseModel';
import RequestModel from '../models/RequestModel';
import DocumentModel from '../models/DocumentModel';
import ProfessionalExperienceModel from '../models//ProfessionalExperienceModel';

export const setupAssociations = () => {
  /**
   * 1. ESPECIALIZAÇÃO DE USUÁRIOS (Herança 1:1)
   * O ID da tabela filha (Student/Admin/Advisor) é o mesmo da tabela pai (User).
   */
  UserModel.hasOne(StudentModel, { foreignKey: 'id', as: 'studentProfile' });
  StudentModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  UserModel.hasOne(AdminModel, { foreignKey: 'id', as: 'adminProfile' });
  AdminModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  UserModel.hasOne(AdvisorModel, { foreignKey: 'id', as: 'advisorProfile' });
  AdvisorModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  /**
   * 2. ESTRUTURA ACADÊMICA E VÍNCULOS
   */
  // Um Aluno pertence a um Curso
  CourseModel.hasMany(StudentModel, { foreignKey: 'courseId', as: 'students' });
  StudentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  // Uma Equivalência (Matéria/Regra) pertence a um Curso
  CourseModel.hasMany(EquivalencyModel, {
    foreignKey: 'courseId',
    as: 'equivalencies',
  });
  EquivalencyModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'course',
  });

  // Relacionamento N:N entre Orientadores e Cursos (Quais cursos o prof. orienta)
  AdvisorModel.belongsToMany(CourseModel, {
    through: AdvisorCourseModel,
    foreignKey: 'advisorId',
    otherKey: 'courseId',
    as: 'courses',
  });
  CourseModel.belongsToMany(AdvisorModel, {
    through: AdvisorCourseModel,
    foreignKey: 'courseId',
    otherKey: 'advisorId',
    as: 'advisors',
  });

  /**
   * 3. FLUXO DE SOLICITAÇÃO (REQUEST)
   */
  // Request -> Aluno (Quem pediu)
  StudentModel.hasMany(RequestModel, {
    foreignKey: 'studentId',
    as: 'requests',
  });
  RequestModel.belongsTo(StudentModel, {
    foreignKey: 'studentId',
    as: 'student',
  });

  // Request -> Orientador (Quem avalia) - Pode ser NULL inicialmente
  AdvisorModel.hasMany(RequestModel, {
    foreignKey: 'advisorId',
    as: 'evaluatedRequests',
  });
  RequestModel.belongsTo(AdvisorModel, {
    foreignKey: 'advisorId',
    as: 'advisor',
  });

  // Request -> Equivalency (O que está sendo pedido)
  EquivalencyModel.hasMany(RequestModel, {
    foreignKey: 'equivalencyId',
    as: 'requests',
  });
  RequestModel.belongsTo(EquivalencyModel, {
    foreignKey: 'equivalencyId',
    as: 'equivalency',
  });

  /**
   * 4. COMPOSIÇÃO DA SOLICITAÇÃO (Agregados/Arquivos)
   * Usamos CASCADE para que, se a Request for deletada, os anexos também sejam.
   */
  // Request -> Documentos (Arquivos PDF/Imagens)
  RequestModel.hasMany(DocumentModel, {
    foreignKey: 'requestId',
    as: 'Documents', // Nome exato usado no include da Service
    onDelete: 'CASCADE',
    hooks: true,
  });
  DocumentModel.belongsTo(RequestModel, {
    foreignKey: 'requestId',
    as: 'request',
  });

  // Request -> Experiência Profissional (Dados de trabalho)
  RequestModel.hasMany(ProfessionalExperienceModel, {
    foreignKey: 'requestId',
    as: 'Professional_Experience', // Nome exato usado no include da Service
    onDelete: 'CASCADE',
    hooks: true,
  });
  ProfessionalExperienceModel.belongsTo(RequestModel, {
    foreignKey: 'requestId',
    as: 'request',
  });

  /**
   * 5. ASSOCIAÇÕES DA TABELA DE VÍNCULO (Opcional para queries diretas)
   */
  AdvisorCourseModel.belongsTo(AdvisorModel, {
    foreignKey: 'advisorId',
    as: 'advisor',
  });
  AdvisorCourseModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'course',
  });
};
