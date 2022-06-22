import _ from 'lodash';
import { Layout, PhysicsEditor, ShapeAndColorEditor } from './components';
import { VisNodeGraphOptions, Series, DefaultOptions, Selectable, Directions } from './types';

export const AVOIDED_KEY = 'isOpen';
export const AVOIDED_TAB = 'tab';
export const EXTRA_KEY = 'extras';
export const NODES = 'nodes';
export const EDGES = 'edges';
export const LAYOUT = 'layout';
export const PHYSICS = 'physics';
export const GROUPS = 'groups';

// @ts-ignore
const defaultCollapse = {
  [LAYOUT]: {
    label: LAYOUT,
    [AVOIDED_TAB]: false,
    children: Layout,
  },
  groups: {
    label: 'Colors and Shapes',
    [AVOIDED_TAB]: true,
    children: ShapeAndColorEditor,
  },
  [PHYSICS]: {
    label: PHYSICS,
    [AVOIDED_TAB]: false,
    children: PhysicsEditor,
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
    nodes.push({
      id: _.get(source, 'externalId'),
      title: sourceTitleText,
      label: _.get(source, 'name') || _.get(source, 'description'),
      group: sourceType,
      meta: _.get(source, 'metadata'),
      // level: sourceExternalId === searchId ? 0 : undefined,
    });
    nodes.push({
      id: _.get(target, 'externalId'),
      title: _.get(target, 'description') || _.get(target, 'name'),
      label: _.get(target, 'name') || _.get(target, 'description'),
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
export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
export const shapeOptions: Selectable[] = _.map(shapes, (id) => ({
  label: _.upperFirst(id),
  id,
}));
export const setValue = (obj: any, path: string[], value: any) => _.set(obj, path, value);
export const getSelectedNode = (collection: any, id: string) => _.find(collection, { id });
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
