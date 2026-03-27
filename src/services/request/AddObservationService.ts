import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class AddObservationService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(requestId: number, observation: string) {
    const request = await this.requestRepo.findById(requestId);

    if (!request) throw new Error('Solicitação não encontrada!');

    if (request.props.observation === observation) {
      return;
    }

    await this.requestRepo.addObservation(requestId, observation);
  }
}
