import { Student, StudentProps } from '../../domain/entities/Student';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';

import bcrypt from 'bcrypt';

type StudentDTO = Omit<StudentProps, 'id'>;

export class CreateStudentService {
  constructor(
    private studentRepository: IStudentRepository,
    private courseRepo: ICourseRepository,
  ) {}

  async execute(student: StudentDTO) {
    if (student.courseId) {
      const courseExists = await this.courseRepo.findById(student.courseId);

      if (!courseExists) {
        throw new Error(
          'Curso não encontrado! Não é possível registrar um estudante em um curso não existente.',
        );
      }
    }

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
