import { IRequestRepository } from '../../domain/repositories/IRequestRepository';
import { IActionLogRepository } from '../../domain/repositories/IActionLogRepository';

export class FindByIdService {
  constructor(
    private requestRepo: IRequestRepository,
    private logRepo: IActionLogRepository,
  ) {}

  async execute(requestId: number) {
    const request = await this.requestRepo.findById(requestId);

    if (!request) return null;

    const logs = await this.logRepo.listByRequestId(requestId);

    return { request, logs };
  }
}
