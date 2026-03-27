import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class FindByProtocolService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(protocol: string) {
    const request = await this.requestRepo.findByProtocol(protocol);

    if (!request) return null;

    return request;
  }
}
