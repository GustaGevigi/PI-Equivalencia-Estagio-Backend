import { Student, StudentProps } from '../domain/entities/Student';
import { IStudentRepository } from '../domain/repositories/IStudentRepository';

import bcrypt from 'bcrypt';

type StudentDTO = Omit<StudentProps, 'id'>;

export class CreateStudentService {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(student: StudentDTO) {
    if (await this.studentRepository.findByEmail(student.email)) {
      throw new Error('Email já cadastrado.');
    }

    if (await this.studentRepository.findByCpf(student.cpf)) {
      throw new Error('CPF já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(student.password, 10);

    const newStudent = new Student({ ...student, password: hashedPassword });

    await this.studentRepository.create(newStudent);

    return newStudent;
  }
}
