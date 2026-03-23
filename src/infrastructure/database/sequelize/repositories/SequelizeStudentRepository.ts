import sequelize from '../../../../config/database';
import { Transaction } from 'sequelize';

import UserModel from '../models/UserModel';

import { Student } from '../../../../domain/entities/Student';
import StudentModel from '../models/StudentModel';
import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';

import CourseModel from '../models/CourseModel';

export class SequelizeStudentRepository implements IStudentRepository {
  private mapToEntity(model: any): Student {
    const data = model.toJSON();

    return new Student({
      id: data.id,
      courseId: data.courseId,
      ra: data.ra,
      rg: data.rg,
      tel: data.tel,

      name: data.user.name,
      email: data.user.email,
      cpf: data.user.cpf,
      password: data.user.password,
      role: data.user.role,
    });
  }

  async create(student: Student): Promise<Student> {
    return await sequelize.transaction(async (t: Transaction) => {
      try {
        const userCreated = await UserModel.create(
          {
            name: student.props.name,
            email: student.props.email,
            cpf: student.props.cpf,
            password: student.props.password,
            role: 'student',
          },
          { transaction: t },
        );

        await StudentModel.create(
          {
            id: userCreated.id,
            courseId: student.props.courseId,
            ra: student.props.ra,
            rg: student.props.rg,
            tel: student.props.tel,
          },
          { transaction: t },
        );

        student.props.id = userCreated.id;

        return student;
      } catch (error) {
        console.log('Erro na transação do Aluno:', error);
        throw error;
      }
    });
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const student = await StudentModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { cpf },
        },
      ],
    });
    return student ? this.mapToEntity(student) : null;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await StudentModel.findOne({
      include: [
        {
          model: UserModel,
          as: 'user',
          where: { email },
        },
      ],
    });
    return student ? this.mapToEntity(student) : null;
  }

  async findById(id: number): Promise<Student | null> {
    const student = await StudentModel.findOne({
      where: { id },
      include: [
        { model: UserModel, as: 'user' },
        { model: CourseModel, as: 'course' },
      ],
    });
    return student ? this.mapToEntity(student) : null;
  }
}
