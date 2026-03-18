import { StudentProps } from '../../domain/entities/Student';
import { IStudentRepository } from '../../domain/repositories/IStudentRepository';

export class GetStudentByIdService {
  constructor(private studentReposiory: IStudentRepository) {}

  async execute(id: number): Promise<StudentProps | null> {
    const student = await this.studentReposiory.findById(id);

    if (!student) return null;

    return student.props;
  }
}
