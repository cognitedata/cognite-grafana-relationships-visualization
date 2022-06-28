import _ from 'lodash';
import {
  defaultGraphValue,
  AVOIDABLE_ENABLED,
  AVOIDED_KEY,
  EDGES,
  EXTRA_KEY,
  GROUPS,
  LAYOUT,
  NODES,
  PHYSICS,
} from './constants';
import { Series } from './types';

export const createRelationshipsNode = (series: Series, visNodeGraph: any) => {
  const relationshipsList = series[2]?.source;
  const nodes: any[] = [];
  const edges: any[] = [];
  const searchId = _.get(visNodeGraph, [EXTRA_KEY, 'externalId']);

  function addValuesToFields(options: any) {
    const { externalId, labels, source, target, sourceType, targetType } = options;
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
  if (!_.isEmpty(searchId)) {
    const r = _.find(_.uniqBy(nodes, 'id'), { id: searchId });
    console.log(r);
  }
  return { edges: _.uniqBy(edges, 'id'), nodes: _.uniqBy(nodes, 'id') };
};
const avoidEnabled = (option: any) => {
  if (option) {
    return {
      ...option,
      widthConstraint: _.get(option.widthConstraint, [AVOIDABLE_ENABLED])
        ? _.omit(option.widthConstraint, [AVOIDABLE_ENABLED])
        : false,
      heightConstraint: _.get(option.heightConstraint, [AVOIDABLE_ENABLED])
        ? _.omit(option.heightConstraint, [AVOIDABLE_ENABLED])
        : false,
    };
  }
  return option;
};
const reducer = (array: any) => _.reduce(array, (t, c) => _.assignIn(t, c), {});
export const createOptions = ({ options, height, width, series }: any) => {
  const defaultMerge = { ...defaultGraphValue, ...options };
  const edges = _.omit(defaultMerge[GROUPS][EDGES], [AVOIDED_KEY]);
  const groups: { [x: string]: any } = reducer(
    _.filter(
      _.map(
        _.get(defaultMerge, [GROUPS]),
        (value, key) =>
          _.difference(getGroupsFromSeries(series), [EDGES]).includes(key) && {
            [key]: _.omit(avoidEnabled(value), [AVOIDED_KEY]),
          }
      )
    )
  );
  // console.log('createOptions', options, '\ns: ', s);

  return {
    [NODES]: groups[NODES],
    [GROUPS]: reducer(_.filter(_.map(groups, (v, k) => !_.includes([NODES, EDGES], k) && { [k]: v }))),
    [LAYOUT]: defaultMerge[LAYOUT],
    [PHYSICS]: defaultMerge[PHYSICS],
    [EDGES]: edges,
    height: `${height}px`,
    width: `${width}px`,
  };
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
export const getSelectedNode = (collection: any, id: string) => _.find(collection, { id });
