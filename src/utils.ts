//import { useTheme2 } from '@grafana/ui';
import _ from 'lodash';
import { AVOIDABLE_ENABLED, AVOIDED_KEY, EDGES, GROUPS, LAYOUT, NODES, PHYSICS } from './constants';
import { Series } from './types';

export const createRelationshipsNode = (series: Series) => {
  const relationshipsList = series[2]?.source;
  const nodes: any[] = [];
  const edges: any[] = [];

  function addValuesToFields(options: any) {
    const { sourceExternalId, externalId, labels, source, target, targetExternalId, sourceType, targetType } = options;
    const sourceTitleText = _.get(source, 'description') || _.get(source, 'name');
    const sourceLabelText = _.get(source, 'name') || _.get(source, 'description');
    const targetLabelText = _.get(target, 'name') || _.get(target, 'description');
    nodes.push({
      id: sourceExternalId,
      title: sourceTitleText,
      label: sourceLabelText,
      group: sourceType,
      meta: _.get(source, 'metadata'),
    });
    nodes.push({
      id: targetExternalId,
      title: _.get(target, 'description') || _.get(target, 'name'),
      label: targetLabelText,
      group: targetType,
      meta: _.get(target, 'metadata'),
    });
    edges.push({
      id: externalId,
      from: sourceExternalId,
      to: targetExternalId,
      label: _.map(labels, ({ externalId }) => externalId)
        .join(' ')
        .trim(),
    });
  }
  _.map(relationshipsList, addValuesToFields);
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
  const color = '#ffffff';
  const groups: { [x: string]: any } = reducer(
    _.filter(
      _.map(_.get(options, [GROUPS]), (value, key) => {
        value.font.color = color;
        return (
          _.includes(getGroupsFromSeries(series), key) && {
            [key]: _.omit(avoidEnabled(value), [AVOIDED_KEY]),
          }
        );
      })
    )
  );
  return {
    [NODES]: groups[NODES] || {},
    [GROUPS]: _.omit(groups, [NODES]),
    [LAYOUT]: options[LAYOUT]?.hierarchical.enabled ? options[LAYOUT] : { hierarchical: false },
    [PHYSICS]: options[PHYSICS] || {},
    [EDGES]: options[EDGES].smooth.enabled
      ? options[EDGES]
      : {
          ...options[EDGES],
          smooth: false,
        },
    height: `${height}px`,
    width: `${width}px`,
  };
};
export const getGroupsFromSeries = (series: Series) => {
  const groups: string[] = [];
  if (series)
    _.map(series[2]?.source, ({ sourceType, targetType }) => {
      groups.push(sourceType);
      groups.push(targetType);
      if (!sourceType.length) groups.push(NODES);
    });
  return _.uniq(groups);
};
