import { Direction, AVOIDED_KEY } from './types';

export const defaultValues = {
  layout: {
    hierarchical: {
      direction: 'NO',
    },
    [AVOIDED_KEY]: true,
  },
  nodes: {
    [AVOIDED_KEY]: false,
    color: '#eee',
    shape: 'ellipse',
  },
  edges: {
    [AVOIDED_KEY]: false,
    color: '#fff',
    length: 100,
  },
};

export const directions: Direction = {
  NO: 'No Hierarchical',
  UD: 'Up-Down',
  DU: 'Down-Up',
  LR: 'Left-Right',
  RL: 'Right-Left',
};
export const shapeOptions = [
  { label: 'Ellipse', id: 'ellipse' },
  { label: 'Circle', id: 'circle' },
  { label: 'Database', id: 'database' },
  { label: 'Box', id: 'box' },
  { label: 'Text', id: 'text' },
];
