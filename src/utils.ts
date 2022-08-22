import { useTheme2 } from '@grafana/ui';
import _ from 'lodash';
import { AVOIDABLE_ENABLED, AVOIDED_KEY, EDGES, EXTRA_KEY, GROUPS, LAYOUT, NODES, PHYSICS } from './constants';
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
    console.log(r, 'found');
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
const useColor = () => {
  const theme = useTheme2();
  const color = theme?.name === 'Dark' ? '#ffffff' : '#000000';
  return color;
};

export const createOptions = ({ options, height, width, series }: any) => {
  //@ts-ignore
  const color = parseInt(window?.grafanaBootData.settings.buildInfo.version.split('.')[0]) > 7 ? useColor() : '#ffffff';

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
export const getSelectedNode = (collection: any, id: string) => _.find(collection, { id });
