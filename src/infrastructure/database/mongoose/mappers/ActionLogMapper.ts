import { ActionLog } from '../../../../domain/entities/ActionLog';

export class ActionLogMapper {
  static toDomain(raw: any): ActionLog {
    return new ActionLog({
      id: raw._id.toString(),
      requestId: raw.requestId,
      author: raw.author,
      authorRole: raw.authorRole,
      action: raw.action,
      createdAt: raw.createdAt,
    });
  }

  static toPersistance(entity: ActionLog) {
    return {
      requestId: entity.props.requestId,
      author: entity.props.author,
      authorRole: entity.props.authorRole,
      action: entity.props.action,
      createdAt: entity.props.createdAt,
    };
  }
}
