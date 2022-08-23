export const AVOIDED_KEY = 'isOpen';
export const EXTRA_KEY = 'extras';
export const AVOIDABLE_ENABLED = 'AVOIDABLE_ENABLED';
export const NODES = 'nodes';
export const EDGES = 'edges';
export const LAYOUT = 'layout';
export const PHYSICS = 'physics';
export const GROUPS = 'groups';
export const shapeList = [
  'ellipse',
  'circle',
  'database',
  'box',
  'text',
  'diamond',
  'dot',
  'star',
  'triangle',
  'triangleDown',
  'hexagon',
  'square',
];
export const smoothList = [
  'dynamic',
  'continuous',
  'discrete',
  'diagonalCross',
  'straightCross',
  'horizontal',
  'vertical',
  'curvedCW',
  'curvedCCW',
  'cubicBezier',
];
export const forceDirectionList = ['horizontal', 'vertical', 'none'];
export const sizableList = [
  'image',
  'circularImage',
  'diamond',
  'dot',
  'star',
  'triangle',
  'triangleDown',
  'hexagon',
  'square',
  'icon',
];
export const vAlignList = ['top', 'middle', 'bottom'];
export const hubSizeDirectionList = ['hubsize', 'directed'];

const widthConstraint = {
  [AVOIDABLE_ENABLED]: false,
  minimum: 1,
};
const heightConstraint = {
  [AVOIDABLE_ENABLED]: false,
  minimum: 1,
};
export const defaultGraphValue = {
  [EXTRA_KEY]: {
    externalId: '',
  },
  [LAYOUT]: {
    hierarchical: {
      enabled: false,
      direction: 'UD',
      levelSeparation: 150,
      nodeSpacing: 100,
      parentCentralization: true,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      sortMethod: 'hubsize',
    },
  },
  [EDGES]: {
    color: { color: '#5a5a5a' },
    font: {
      color: '#5a5a5a',
      strokeWidth: 0,
      bold: {},
    },
    length: 100,
    dashes: false,
    smooth: {
      enabled: false,
      forceDirection: false,
      roundness: 0.5,
      type: 'horizontal',
    },
  },
  [GROUPS]: {
    [NODES]: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#5a5a5a',
        border: '#5a5a5a',
      },
      font: {
        color: '#FFFDD0',
      },
    },
    asset: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#8AB8FF',
        border: '#FFFDD0',
      },
      font: {
        color: '#FFFDD0',
      },
    },
    timeSeries: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#FADE2A',
        border: '#FFFDD0',
      },
      font: {
        color: '#FFFDD0',
      },
    },
    files: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#FADE2A',
        border: '#FFFDD0',
      },
      font: {
        color: '#FFFDD0',
      },
    },
    event: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#FADE2A',
        border: '#FFFDD0',
      },
      font: {
        color: '#FFFDD0',
      },
    },
    sequence: {
      [AVOIDED_KEY]: false,
      widthConstraint,
      heightConstraint,
      color: {
        background: '#FADE2A',
        border: '#FFFDD0',
      },
      font: {
        color: '#FFFDD0',
      },
    },
  },
  [PHYSICS]: {
    enabled: true,
    maxVelocity: 50,
    minVelocity: 0.1,
  },
};
