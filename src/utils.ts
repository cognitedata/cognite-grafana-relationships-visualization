import _ from 'lodash';
import { AVOIDED_KEY } from './types';
import { CustomEditor } from './components';

export const customSettings = {
  id: 'visNodeGraph',
  path: 'visNodeGraph',
  name: '',
  editor: CustomEditor,
};

// @ts-ignore
export const createRelationshipsNode = (series) => {
  const relationshipsList = series[2]?.source;
  const nodes: any[] = [];
  const edges: any[] = [];
  // @ts-ignore
  function addValuesToFields(options) {
    const { externalId, sourceExternalId, labels, targetExternalId, source, target, sourceType, targetType } = options;
    nodes.push({
      id: sourceExternalId,
      title: _.get(source, 'description') || _.get(source, 'name'),
      label: _.get(source, 'name') || _.get(source, 'description'),
      group: sourceType,
    });
    nodes.push({
      id: targetExternalId,
      title: _.get(target, 'description') || _.get(target, 'name'),
      label: _.get(target, 'name') || _.get(target, 'description'),
      group: targetType,
    });
    edges.push({
      id: externalId,
      from: sourceExternalId,
      to: targetExternalId,
      label: _.map(labels, ({ externalId }) => externalId)
        .join(', ')
        .trim(),
    });
  }
  _.map(relationshipsList, addValuesToFields);
  return { edges, nodes };
};

const omitIsOpen = (obj: any) => {
  if (obj.hierarchical) {
    if (obj.hierarchical.direction === 'NO') {
      return { ..._.omit(obj, [AVOIDED_KEY]), hierarchical: false };
    }
  }
  return _.omit(obj, [AVOIDED_KEY]);
};
// @ts-ignore
export const createOptions = ({ visNodeGraph, height, width }) =>
  _.reduce(
    _.map(visNodeGraph, (value, key) => ({
      [key]: {
        ...omitIsOpen(value),
      },
    })),
    (total, current) => _.assignIn(total, _.omit(current, [AVOIDED_KEY]), total),
    {
      height: `${height}px`,
      width: `${width}px`,
      groups: {
        event: {
          shape: 'triangle',
          color: '#FF9900', // orange
        },
        asset: {
          shape: 'dot',
          color: '#2B7CE9', // blue
        },
      },
    }
  );
