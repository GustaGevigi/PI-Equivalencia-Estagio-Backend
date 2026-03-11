import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';
import { Student } from '../../../../domain/entities/Student';
import StudentModel from '../models/StudentModel';

export class SequelizeStudentRepository implements IStudentRepository {
  async create(student: Student): Promise<void> {
    await StudentModel.create(student.props);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await StudentModel.findOne({ where: { email } });
    return student ? new Student(student.toJSON()) : null;
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const student = await StudentModel.findOne({ where: { cpf } });
    return student ? new Student(student.toJSON()) : null;
  }

  async findById(id: string): Promise<Student | null> {
    const student = await StudentModel.findOne({ where: { id } });
    return student ? new Student(student.toJSON()) : null;
  }
}
