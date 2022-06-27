import _ from 'lodash';
import {
  AVOIDABLE_ENABLED,
  AVOIDED_KEY,
  EDGES,
  EXTRA_KEY,
  GROUPS,
  hubSizeDirectionList,
  NODES,
  shapeList,
  vAlignList,
} from './constants';
import { Series, Selectable, Directions } from './types';

const toSelectable = (id: string): Selectable => ({ id, label: _.upperFirst(id) });
export const shapeOptions: Selectable[] = _.map(shapeList, toSelectable);
export const valignOptions = _.map(vAlignList, toSelectable);
export const sortMethods = _.map(hubSizeDirectionList, toSelectable);
export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
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
      label: sourceLabelText, // .substring(0, 25) + ' ...',
      group: sourceType,
      meta: _.get(source, 'metadata'),
      // level: sourceExternalId === searchId ? 0 : undefined,
    });
    nodes.push({
      id: _.get(target, 'externalId'),
      title: _.get(target, 'description') || _.get(target, 'name'),
      label: targetLabelText,
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
const avoidEnabled = (option: any) => ({
  ...option,
  widthConstraint: _.get(option.widthConstraint, [AVOIDABLE_ENABLED])
    ? _.omit(option.widthConstraint, [AVOIDABLE_ENABLED])
    : false,
  heightConstraint: _.get(option.heightConstraint, [AVOIDABLE_ENABLED])
    ? _.omit(option.heightConstraint, [AVOIDABLE_ENABLED])
    : false,
});
export const createOptions = ({ options, height, width }: any) => {
  if (options.groups) {
    return {
      height: `${height}px`,
      width: `${width}px`,
      ..._.omit(options, [GROUPS, EXTRA_KEY]),
      [EDGES]: _.omit(options.groups[EDGES], [AVOIDED_KEY]),
      [NODES]: _.omit(avoidEnabled(options.groups[NODES]), [AVOIDED_KEY]),
      [GROUPS]: _.reduce(
        _.map(options.groups[GROUPS], (value, key) => ({
          [key]: _.omit(avoidEnabled(value), [AVOIDED_KEY]),
        })),
        (t, c) => _.assignIn(t, c),
        {}
      ),
    };
  }
  return {
    ...options,
    height: `${height}px`,
    width: `${width}px`,
  };
};
export const values = (value: any, defaultValue: any) => _.defaults(value, defaultValue);
export const getGroupsFromSeries = (series: Series) => {
  const groups: string[] = [EDGES, NODES];
  if (series)
    _.map(series[2]?.source, ({ sourceType, targetType }) => {
      groups.push(sourceType);
      groups.push(targetType);
    });
  return _.uniq(groups);
};
export const upperFirst = (t: string): string => _.upperFirst(t);
export const getValue = (obj: any, keys: string[]) => _.get(obj, keys);
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');
export const setValue = (obj: any, path: string[], value: any) => _.set(obj, path, value);
export const getSelectedNode = (collection: any, id: string) => _.find(collection, { id });
