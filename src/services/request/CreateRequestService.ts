import { Request, RequestProps } from '../../domain/entities/Request';
import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export type RequestDTO = Omit<
  RequestProps,
  'id' | 'status' | 'observation' | 'protocol' | 'Documents'
>;
export class CreateRequestService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(requestData: RequestDTO, files: any[]): Promise<Request> {
    const isDuplicate = await this.requestRepo.checkDuplicity(
      requestData.studentId,
      requestData.equivalencyId,
    );

    if (isDuplicate) {
      throw new Error('Você já possui uma solicitação para esta equivalência');
    }

    const protocol = await this.requestRepo.generateProtocol();

    const newRequest = new Request({
      ...requestData,
      protocol,
      status: 'Pendente' as any,
      observation: '',
      Documents: files.map((file) => ({
        path: file.filename,
      })),
    });

    return await this.requestRepo.create(newRequest);
  }
}
