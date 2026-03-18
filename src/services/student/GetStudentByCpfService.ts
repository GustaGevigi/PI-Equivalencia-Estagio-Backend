import { StudentProps } from '../../domain/entities/Student';
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';

export class GetStudentByCpfService {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(cpf: string): Promise<StudentProps | null> {
    const studentFound = await this.studentRepository.findByCpf(cpf);

    if (!studentFound) {
      return null;
    }

    return studentFound.props;
  }
}
