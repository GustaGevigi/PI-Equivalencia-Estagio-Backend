export interface EquivalencyProps {
  id?: number;
  name: string;
  description: string;
}

export class Equivalency {
  constructor(public props: EquivalencyProps) {}
}
