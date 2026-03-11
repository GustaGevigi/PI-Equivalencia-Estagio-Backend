import { error } from 'console';
import { Student, StudentProps } from '../domain/entities/Student';
import { IStudentRepository } from '../domain/repositories/IStudentRepository';

import bcrypt from 'bcrypt';

type StudentDTO = Omit<StudentProps, 'id'>;

export class CreateStudentService {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(data: StudentDTO) {
    if (await this.studentRepository.findByEmail(data.email)) {
      throw new Error('Email já cadastrado.');
    }

    if (await this.studentRepository.findByCpf(data.cpf)) {
      throw new Error('CPF já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const student = new Student({ ...data, password: hashedPassword });

    await this.studentRepository.create(student);

    return student;
  }
}

export default CreateStudentService;
