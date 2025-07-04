export interface Node {
  id: string;
  gender?: string;
  role?: string;
  traits?: string[];
}

interface Link {
  source: string;
  target: string;
  label: string;
}

export interface BookData {
  nodes: Node[]
  links: Link[]
}