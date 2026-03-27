import { Request, RequestProps, Status } from '../../domain/entities/Request';
import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class UpdateStatusService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(requestId: number, status: Status) {
    const request = await this.requestRepo.findById(requestId);

    if (!request) throw new Error('Solicitação não encontrada!');

    if (request.props.status === status) {
      return;
    }

    await this.requestRepo.updateStatus(requestId, status);
  }
}
