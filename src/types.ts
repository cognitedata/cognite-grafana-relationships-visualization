import { AVOIDABLE_ENABLED, AVOIDED_KEY, LAYOUT, PHYSICS } from './constants';
type Arrow = {
  enabled?: boolean;
  type?: string;
};
type Arrows = {
  to?: Arrow;
  middle?: Arrow;
  from?: Arrow;
};
interface GroupConfig {
  [AVOIDED_KEY]: boolean;
  shape?: string;
  color?: {
    border?: string;
    background: string;
  };
  font?: { color: string };
  widthConstraint?:
    | {
        [AVOIDABLE_ENABLED]: true;
        minimum?: number;
        maximum?: number;
      }
    | false;
  heightConstraint?: { [AVOIDABLE_ENABLED]: true; minimum?: number; valign?: string } | false;
}
export interface DefaultOptions {
  clickToUse?: boolean;
  [LAYOUT]: {
    hierarchical?:
      | {
          enabled: true;
          direction?: string;
          levelSeparation?: number;
          nodeSpacing?: number;
          parentCentralization?: boolean;
          treeSpacing: number;
          blockShifting: boolean;
          edgeMinimization: boolean;
          sortMethod: string;
        }
      | false;
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
    arrows?: Arrows;
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
    solver?: string;
    stabilization?:
      | {
          enabled?: boolean;
        }
      | false;
  };
  height?: number;
  width?: number;
}

export interface VisNodeGraphOptions {
  [x: string]: any;
}

export type Series = any[];

export interface Direction {
  [x: string]: string;
}
export enum Directions {
  DU = 'Down-Up',
  LR = 'Left-Right',
  RL = 'Right-Left',
  UD = 'Up-Down',
}
export interface Pathing {
  parent: string;
  selector: string;
  toggled: string;
}
