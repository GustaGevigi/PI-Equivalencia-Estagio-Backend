import { StudentProps } from '../domain/entities/Student';
import { IStudentRepository } from '../domain/repositories/IStudentRepository';

export class GetStudentByEmailService {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(email: string): Promise<StudentProps | null> {
    const studentFound = await this.studentRepository.findByEmail(email);

    if (!studentFound) {
      return null;
    }

    return studentFound.props;
  }
}
