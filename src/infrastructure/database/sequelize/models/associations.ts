import UserModel from './UserModel';
import StudentModel from './StudentModel';
import AdminModel from './AdminModel';
import AdvisorModel from './AdvisorModel';
import CourseModel from './CourseModel';
import EquivalencyModel from './EquivalencyModel';
import AdvisorCourseModel from './AdvisorCourseModel';

export const setupAssociations = () => {
  // === HERANÇA DE USUÁRIOS (1:1) ===
  // Um Usuário "é um" Aluno, Admin ou Orientador
  UserModel.hasOne(StudentModel, { foreignKey: 'id', as: 'studentProfile' });
  StudentModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  UserModel.hasOne(AdminModel, { foreignKey: 'id', as: 'adminProfile' });
  AdminModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  UserModel.hasOne(AdvisorModel, { foreignKey: 'id', as: 'advisorProfile' });
  AdvisorModel.belongsTo(UserModel, { foreignKey: 'id', as: 'user' });

  // === RELACIONAMENTOS DE ALUNO ===
  // Um Aluno pertence a um Curso
  CourseModel.hasMany(StudentModel, { foreignKey: 'courseId', as: 'students' });
  StudentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  // === RELACIONAMENTOS DE VÍNCULO DE ORIENTADOR E CURSO (N:N) ===
  // Vários Orientadores pertencem a vários cursos

  AdvisorModel.belongsToMany(CourseModel, {
    through: AdvisorCourseModel,
    foreignKey: 'advisorId', // FK que aponta para o Orientador na tabela de vínculo
    otherKey: 'courseId', // FK que aponta para o Curso na tabela de vínculo
    as: 'courses', // Alias para usar no include
  });

  // Um Curso está vinculado a Muitos Orientadores
  CourseModel.belongsToMany(AdvisorModel, {
    through: AdvisorCourseModel,
    foreignKey: 'courseId',
    otherKey: 'advisorId',
    as: 'advisors',
  });

  // --- Opcional mas recomendado ---
  // Se você quiser buscar os dados da tabela de vínculo diretamente:
  AdvisorCourseModel.belongsTo(AdvisorModel, {
    foreignKey: 'advisorId',
    as: 'advisor',
  });
  AdvisorCourseModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'course',
  });
};
