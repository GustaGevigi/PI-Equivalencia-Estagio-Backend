import { Request, RequestProps } from '../../domain/entities/Request';
import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

import { ActionLog } from '../../domain/entities/ActionLog';
import { IActionLogRepository } from '../../domain/repositories/IActionLogRepository';

export type RequestDTO = Omit<
  RequestProps,
  'id' | 'status' | 'observation' | 'protocol' | 'Documents'
>;
export class CreateRequestService {
  constructor(
    private requestRepo: IRequestRepository,
    private logRepo: IActionLogRepository,
  ) {}

  async execute(
    requestData: RequestDTO,
    logInfo: { author: string; authorRole: string },
    files: any[],
  ): Promise<Request> {
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

    const savedRequest = await this.requestRepo.create(newRequest);

    if (!savedRequest.props.id) {
      throw new Error('Falha ao obter ID da solicitação para registro de log.');
    }

    const newLog = new ActionLog({
      requestId: savedRequest.props.id,
      action: 'Solicitação Criada',
      author: logInfo.author,
      authorRole: logInfo.authorRole,
      createdAt: new Date(),
    });

    await this.logRepo.save(newLog);

    return savedRequest;
  }
}
