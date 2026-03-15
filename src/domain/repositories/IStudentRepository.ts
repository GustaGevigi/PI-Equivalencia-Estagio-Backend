import { Student } from '../entities/Student';

export interface IStudentRepository {
  create(student: Student): Promise<void>;
  findByEmail(email: string): Promise<Student | null>;
  findByCpf(cpf: string): Promise<Student | null>;
  findById(id: number): Promise<Student | null>;
}
