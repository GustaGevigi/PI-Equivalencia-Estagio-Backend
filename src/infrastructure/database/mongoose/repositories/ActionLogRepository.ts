import { ActionLogModel } from '../models/ActionLogModel';
import { IActionLogRepository } from '../../../../domain/repositories/IActionLogRepository';
import { ActionLog } from '../../../../domain/entities/ActionLog';
import { ActionLogMapper } from '../mappers/ActionLogMapper';

export class ActionLogRepository implements IActionLogRepository {
  async save(actionLog: ActionLog): Promise<void> {
    const data = ActionLogMapper.toPersistance(actionLog);

    await ActionLogModel.create(data);
  }

  async listByRequestId(requestId: number): Promise<ActionLog[]> {
    const logs = await ActionLogModel.find({ requestId });

    return logs.map((log) => ActionLogMapper.toDomain(log));
  }
}
