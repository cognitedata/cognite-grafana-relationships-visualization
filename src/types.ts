export const AVOIDED_KEY = 'isOpen';
export interface DefaultOptions {
  layout: {
    [AVOIDED_KEY]: boolean;
    hierarchical: {
      enabled: boolean;
      direction: string;
    };
  };
  nodes: {
    [AVOIDED_KEY]: boolean;
    shape: string;
  };
  edges: {
    [AVOIDED_KEY]: boolean;
    color: string;
    length: number;
  };
}
export interface VisNodeGraphOptions {
  visNodeGraph: DefaultOptions;
}
