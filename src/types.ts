import { AVOIDABLE_ENABLED, AVOIDED_KEY, EXTRA_KEY, LAYOUT, PHYSICS } from './constants';

interface GroupConfig {
  [AVOIDED_KEY]: boolean;
  shape?: string;
  color?: {
    border?: string;
    background: string;
  };
  font?: { color: string };
  widthConstraint?: {
    [AVOIDABLE_ENABLED]: boolean;
    minimum?: number;
    maximum?: number;
  };
  heightConstraint?: { [AVOIDABLE_ENABLED]: boolean; minimum?: number; valign?: string };
}
export interface DefaultOptions {
  clickToUse?: boolean;
  [LAYOUT]: {
    hierarchical?: {
      enabled: boolean;
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
  nodes: GroupConfig;
  edges: {
    [AVOIDED_KEY]: boolean;
    color?: {
      color?: string;
    };
    font?: { color?: string };
    length?: number;
    dashes?: boolean;
  };
  groups: {
    asset?: GroupConfig;
    timeSeries?: GroupConfig;
    files?: GroupConfig;
    event?: GroupConfig;
    sequence?: GroupConfig;
  };
  [PHYSICS]: {
    enabled: boolean;
    minVelocity?: number;
    maxVelocity?: number;
  };
  height?: number;
  width?: number;
  [EXTRA_KEY]: {
    rootId?: string;
  };
}

export interface VisNodeGraphOptions {
  [x: string]: any;
}

export type Series = any[];

export interface Direction {
  [x: string]: string;
}
export enum Directions {
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
