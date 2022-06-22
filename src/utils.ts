import _ from 'lodash';
import { getField } from './components/exporter';
import { VisNodeGraphOptions, Series, DefaultOptions, Selectable, Directions } from './types';

export const AVOIDED_KEY = 'isOpen';
export const AVOIDED_TAB = 'tab';
export const EXTRA_KEY = 'extras';
export const NODES = 'nodes';
export const EDGES = 'edges';
export const LAYOUT = 'layout';
export const PHYSICS = 'physics';
export const GROUPS = 'groups';
export const CONDITIONED_FIELDS = 'CONDITIONED_FIELDS';
export const CONDITION_PATH = 'CONDITION_PATH';
export const CONDITION_INCLUDES = 'CONDITION_INCLUDES';
export const SWITCH = 'SWITCH';
export const NUMBER = 'NUMBER';
export const INPUT = 'INPUT';
export const SELECT = 'SELECT';
export const SLIDER = 'SLIDER';

export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
const shapes: string[] = [
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
export const shapeOptions: Selectable[] = _.map(shapes, (id) => ({
  label: _.upperFirst(id),
  id,
}));
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

export const sortMethods = _.map(['hubsize', 'directed'], (label) => ({ id: label, label }));

// @ts-ignore
export const defaultCollapse: any = {
  [LAYOUT]: {
    label: LAYOUT,
    selector: 'hierarchical',
    children: {
      rootId: {
        type: INPUT,
        path: [EXTRA_KEY, 'rootId'],
        label: 'Root ExternalId',
      },
      direction: {
        type: SELECT,
        label: 'Direction',
        options: directionsOptions,
      },
      [CONDITIONED_FIELDS]: [
        { [CONDITION_PATH]: 'direction' },
        {
          sortMethod: {
            type: SELECT,
            label: 'Sort Method',
            options: sortMethods,
          },
        },
        {
          levelSeparation: {
            type: NUMBER,
            label: 'Level Separation',
          },
        },
        {
          nodeSpacing: {
            type: NUMBER,
            label: 'Level Separation',
          },
        },
        {
          treeSpacing: {
            type: NUMBER,
            label: 'Tree Spacing',
          },
        },
        {
          parentCentralization: {
            type: SWITCH,
            label: 'Parent Centralization',
          },
        },
        {
          blockShifting: {
            type: SWITCH,
            label: 'Block Shifting',
          },
        },
        {
          edgeMinimization: {
            type: SWITCH,
            label: 'Edge Minimization',
          },
        },
      ],
    },
  },
  [GROUPS]: {
    label: 'Colors and Shapes',
    [AVOIDED_TAB]: true,
    style: { padding: 8 },
    children: {
      [EDGES]: {
        colors: [
          {
            path: ['color', 'color'],
            label: 'Background',
          },
          {
            path: ['font', 'color'],
            label: 'Font',
          },
        ],
        length: {
          type: SLIDER,
          path: ['length'],
          label: 'Length',
        },
        dashes: {
          type: SWITCH,
          path: ['dashes'],
          label: 'Dashes',
        },
      },
      [NODES]: {
        colors: [
          {
            path: ['color', 'background'],
            label: 'Background',
          },
          {
            path: ['color', 'border'],
            label: 'Border',
          },
          {
            path: ['font', 'color'],
            label: 'Font',
          },
        ],
        shape: {
          type: SELECT,
          path: ['shape'],
          label: 'Shape',
          options: shapeOptions,
        },
        [CONDITIONED_FIELDS]: [
          { [CONDITION_INCLUDES]: sizableList },
          {
            size: {
              type: SLIDER,
              path: ['size'],
              label: 'Size',
            },
          },
        ],
      },
    },
  },
  [PHYSICS]: {
    label: PHYSICS,
    children: {
      enabled: {
        type: SWITCH,
        label: 'Enabled',
      },
      [CONDITIONED_FIELDS]: [
        { [CONDITION_PATH]: 'enabled' },
        {
          minVelocity: {
            type: NUMBER,
            label: 'Min Velocity',
          },
        },
        {
          maxVelocity: {
            type: NUMBER,
            label: 'Max Velocity',
          },
        },
      ],
    },
  },
};
const defaultValues: DefaultOptions = {
  [EXTRA_KEY]: {
    rootId: '',
  },
  [LAYOUT]: {
    hierarchical: {
      direction: 'NO',
      levelSeparation: 150,
      nodeSpacing: 100,
      parentCentralization: true,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      sortMethod: 'hubsize',
    },
    [AVOIDED_KEY]: false,
  },
  nodes: {
    color: {
      background: '#FFFFFF',
    },
  },
  edges: {
    color: {
      color: '#FFFFF',
    },
    font: { color: '#000000' },
    length: 100,
    dashes: false,
  },
  interaction: {
    navigationButtons: true,
  },
  groups: {
    [AVOIDED_KEY]: false,
    [AVOIDED_TAB]: NODES,
    asset: {
      color: {
        background: '#8AB8FF',
      },
    },
    event: {
      color: {
        background: '#FADE2A',
      },
    },
  },
  [PHYSICS]: {
    [AVOIDED_KEY]: false,
    enabled: true,
    maxVelocity: 50,
    minVelocity: 0.1,
  },
};
const omitIsOpen = (obj: any) => {
  return _.isEqual(getValue(obj, ['hierarchical', 'direction']), 'NO')
    ? {
        ..._.omit(obj, [AVOIDED_KEY, AVOIDED_TAB]),
        hierarchical: {
          ..._.omit(obj.hierarchical, ['direction']),
          enabled: false,
        },
      }
    : _.omit(obj, [AVOIDED_KEY, AVOIDED_TAB, EXTRA_KEY]);
};
export const createRelationshipsNode = (series: Series, visNodeGraph: any) => {
  const relationshipsList = series[2]?.source;
  const searchId = getValue(visNodeGraph, [EXTRA_KEY, 'rootId']);
  const nodes: any[] = [];
  const edges: any[] = [];

  function addValuesToFields(options: any) {
    const { externalId, labels, source, target, sourceType, targetType } = options;
    if (searchId === _.get(source, 'externalId')) {
      console.log(searchId, 'source');
    }
    if (searchId === _.get(target, 'externalId')) {
      console.log(searchId, 'target');
    }
    const sourceTitleText = _.get(source, 'description') || _.get(source, 'name');
    const sourceLabelText = _.get(source, 'name') || _.get(source, 'description');
    const targetLabelText = _.get(target, 'name') || _.get(target, 'description');
    nodes.push({
      id: _.get(source, 'externalId'),
      title: sourceTitleText,
      label: sourceLabelText.substring(0, 15) + ' ...',
      group: sourceType,
      meta: _.get(source, 'metadata'),
      // level: sourceExternalId === searchId ? 0 : undefined,
    });
    nodes.push({
      id: _.get(target, 'externalId'),
      title: _.get(target, 'description') || _.get(target, 'name'),
      label: targetLabelText.substring(0, 15) + ' ...',
      group: targetType,
      // level: targetExternalId === searchId ? 0 : undefined,
      meta: _.get(target, 'metadata'),
    });
    edges.push({
      id: externalId,
      from: _.get(source, 'externalId'),
      to: _.get(target, 'externalId'),
      label: _.map(labels, ({ externalId }) => externalId)
        .join(', ')
        .trim(),
    });
  }
  _.map(relationshipsList, addValuesToFields);
  return { edges: _.uniqBy(edges, 'id'), nodes: _.uniqBy(nodes, 'id') };
};
export const createOptions = ({ visNodeGraph, height, width }: VisNodeGraphOptions) =>
  _.reduce(
    _.map(visNodeGraph, (value, key) =>
      _.omit(
        {
          [key]: {
            ...omitIsOpen(value),
          },
        },
        [EXTRA_KEY]
      )
    ),
    (total, current) => _.assignIn(total, _.omit(current, [AVOIDED_KEY]), total),
    {
      height: `${height}px`,
      width: `${width}px`,
    }
  );
export const values = (value: DefaultOptions): DefaultOptions => {
  return _.defaults(value, defaultValues);
};
export const getGroupsFromSeries = (series: Series) => {
  const groups: string[] = [EDGES, NODES];
  if (series)
    _.map(series[2]?.source, ({ sourceType, targetType }) => {
      groups.push(sourceType);
      groups.push(targetType);
    });
  return _.uniq(groups);
};
export const tabLabel = (t: string): string => _.upperFirst(t);
export const getValue = (obj: any, keys: string[]) => _.get(obj, keys);
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');

export const setValue = (obj: any, path: string[], value: any) => _.set(obj, path, value);
export const getSelectedNode = (collection: any, id: string) => _.find(collection, { id });
export const getSeletedValue = (type: string, value: any) => {
  switch (type) {
    case SWITCH:
      return !value;
    case SELECT:
      return value.id;
    case SLIDER:
    case NUMBER:
      return parseFloat(value);
    default:
    case INPUT:
      return value;
  }
};
export const checkCondition = (value: any, type: string) => {
  switch (type) {
    case 'direction':
      return value === 'NO';
    default:
      return value;
  }
};

export const getChildrens = (
  object: { [x: string]: { type: any; label: any; options: any; path: any } },
  selector: any,
  key: any,
  childKey: any,
  pathValue: (arg0: any) => any,
  setPathValue: (arg0: any, arg1: any) => any,
  onChange: (arg0: any) => any
) =>
  Object.keys(object).map((objKey) => {
    const { type, label, options, path } = object[objKey];
    const fieldPath = path ? path : selector ? [key, selector, childKey] : [key, childKey];
    const value = pathValue(fieldPath);
    return getField(type, {
      label,
      options,
      value,
      onChange: (changed: any) => {
        const selectedValue = getSeletedValue(type, changed);
        return onChange(setPathValue(selectedValue, fieldPath));
      },
    });
  });
