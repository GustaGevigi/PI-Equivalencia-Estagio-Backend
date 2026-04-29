interface ActionLogDTO {
  id?: number;
  requestId: number;
  author: string;
  authorRole: string;
  action: string;
  createdAt: Date;
}

export class ActionLog {
  constructor(public props: ActionLogDTO) {}
}
