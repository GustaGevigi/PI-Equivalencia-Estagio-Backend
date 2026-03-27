import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class CancelRequestService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(requestId: number) {
    const request = await this.requestRepo.findById(requestId);

    if (!request) throw new Error('Solicitação não encontrada!');

    return this.requestRepo.cancelRequest(requestId);
  }
}
