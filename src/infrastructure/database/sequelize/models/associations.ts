import AdminModel from '../models/AdminModel';
import CourseModel from '../models/CourseModel';
import StudentModel from '../models/StudentModel';
import AdvisorModel from '../models/AdvisorModel';
/*import AdvisorAssignmentModel from '../models/AdvisorAssignmentModel'; // Antigo 'vinculo'
import SolicitationModel from '../models/SolicitationModel';
import EquivalencyTypeModel from '../models/EquivalencyTypeModel'; // Antigo 'equivalencia'
import DocumentModel from '../models/DocumentModel';*/

export const setupAssociations = () => {
  /** * 1. ADMINISTRAÇÃO E CURSO
   * O Admin cria o curso (Auditoria simples).
   */
  AdminModel.hasMany(CourseModel, {
    foreignKey: 'createdByAdminId',
    as: 'createdCourses',
  });
  CourseModel.belongsTo(AdminModel, {
    foreignKey: 'createdByAdminId',
    as: 'creatorAdmin',
  });

  /** * 2. ALOCAÇÃO DE ORIENTADORES (AdvisorAssignment - Antigo 'vinculo')
   * Um orientador pode estar alocado em um ou mais cursos.
   */
  /*AdvisorModel.hasMany(AdvisorAssignmentModel, {
    foreignKey: 'advisorId',
    as: 'assignments',
  });
  AdvisorAssignmentModel.belongsTo(AdvisorModel, {
    foreignKey: 'advisorId',
    as: 'advisor',
  });

  CourseModel.hasMany(AdvisorAssignmentModel, {
    foreignKey: 'courseId',
    as: 'advisorAssignments',
  });

  AdvisorAssignmentModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'course',
  });

  /** * 3. ALUNO E CURSO
   * Um curso tem muitos alunos; um aluno pertence a um curso.
   */
  CourseModel.hasMany(StudentModel, { foreignKey: 'courseId', as: 'students' });
  StudentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  /** * 4. FLUXO DE SOLICITAÇÃO (O Coração do Sistema)
   * Aluno abre Solicitação; Solicitação tem um tipo de Equivalência.
   */
  /*StudentModel.hasMany(SolicitationModel, {
    foreignKey: 'studentId',
    as: 'solicitations',
  });
  SolicitationModel.belongsTo(StudentModel, {
    foreignKey: 'studentId',
    as: 'student',
  });

  EquivalencyTypeModel.hasMany(SolicitationModel, {
    foreignKey: 'equivalencyTypeId',
    as: 'solicitations',
  });
  SolicitationModel.belongsTo(EquivalencyTypeModel, {
    foreignKey: 'equivalencyTypeId',
    as: 'type',
  });

  /** * 5. DOCUMENTOS
   * Uma solicitação pode ter vários documentos anexados.
   */
  /*SolicitationModel.hasMany(DocumentModel, {
    foreignKey: 'solicitationId',
    as: 'documents',
  });
  DocumentModel.belongsTo(SolicitationModel, {
    foreignKey: 'solicitationId',
    as: 'solicitation',
  });*/
};
