import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class GenerateProtocolService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute() {
    const string = await this.requestRepo.generateProtocol();

    return string;
  }
}
