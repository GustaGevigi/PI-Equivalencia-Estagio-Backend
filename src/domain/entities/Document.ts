export interface DocumentProps {
  id?: number;
  requestId?: number;
  path: string;
}

export class Document {
  constructor(public props: DocumentProps) {}
}
