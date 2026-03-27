import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class FindByIdService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(requestId: number) {
    const request = await this.requestRepo.findById(requestId);

    if (!request) return null;

    return request;
  }
}
