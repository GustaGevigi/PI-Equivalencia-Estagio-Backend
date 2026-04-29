import { ActionLog } from '../entities/ActionLog';

export interface IActionLogRepository {
  save(actionLog: ActionLog): Promise<void>;
  listByRequestId(id: number): Promise<ActionLog[]>;
}
