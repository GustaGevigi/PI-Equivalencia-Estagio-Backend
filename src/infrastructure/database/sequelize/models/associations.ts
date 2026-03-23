import UserModel from './UserModel';
import StudentModel from './StudentModel';
import AdminModel from './AdminModel';
import AdvisorModel from './AdvisorModel';
import CourseModel from './CourseModel';
import EquivalencyModel from './EquivalencyModel';

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
};
