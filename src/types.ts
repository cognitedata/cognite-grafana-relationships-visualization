import { AVOIDED_KEY, AVOIDED_TAB, EXTRA_KEY, LAYOUT, PHYSICS } from './utils';

interface GroupConfig {
  shape?: string;
  color?: {
    border?: string;
    background: string;
  };
  font?: { color: string };
}
type NodesTypes = GroupConfig & {
  widthConstraint?:
    | boolean
    | {
        minimum: number;
        maximum: number;
      };
} & {
  heightConstraint?:
    | boolean
    | {
        minimum: number;
        valign: string;
      };
};
export interface DefaultOptions {
  clickToUse?: boolean;
  [LAYOUT]?: {
    [AVOIDED_KEY]: boolean;
    hierarchical?: {
      direction?: string;
      levelSeparation?: number;
      nodeSpacing?: number;
      parentCentralization?: boolean;
      treeSpacing: number;
      blockShifting: boolean;
      edgeMinimization: boolean;
      sortMethod: string;
    };
  };
  interaction?: {
    navigationButtons?: boolean;
  };
  nodes?: NodesTypes;
  edges?: {
    color?: {
      color?: string;
    };
    font?: { color?: string };
    length?: number;
    dashes?: boolean;
  };
  groups: {
    [AVOIDED_KEY]: boolean;
    [AVOIDED_TAB]: string;
    asset?: GroupConfig;
    timeSeries?: GroupConfig;
    files?: GroupConfig;
    event?: GroupConfig;
    sequence?: GroupConfig;
  };
  [PHYSICS]: {
    [AVOIDED_KEY]: boolean;
    enabled: boolean;
    minVelocity?: number;
    maxVelocity?: number;
  };
  height?: number;
  width?: number;
  [EXTRA_KEY]?: {
    rootId?: string;
  };
}

export interface VisNodeGraphOptions {
  visNodeGraph: DefaultOptions;
  height?: number;
  width?: number;
}

export type Series = any[];

export interface Direction {
  [x: string]: string;
}
export enum Directions {
  NO = 'No Hierarchical',
  UD = 'Up-Down',
  DU = 'Down-Up',
  LR = 'Left-Right',
  RL = 'Right-Left',
}
export interface Selectable {
  id: string;
  label: string;
}
export interface Pathing {
  parent: string;
  selector: string;
  toggled: string;
}

export type SelectedValue = Selectable | any;
