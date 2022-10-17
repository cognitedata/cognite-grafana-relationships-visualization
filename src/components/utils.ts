import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import {
  hubSizeDirectionList,
  shapeList,
  vAlignList,
  smoothList,
  forceDirectionList,
  typesList,
  solverList,
} from '../constants';
import { Directions } from '../types';

const sortList = (list: string[]): string[] => _.sortBy(list);
const toSelectable = (value: string): SelectableValue => ({ value, label: upperFirst(value) });
export const upperFirst = (t: string): string => _.upperFirst(t);
export const shapeOptions: SelectableValue[] = _.map(sortList(shapeList), toSelectable);
export const smoothOptions: SelectableValue[] = _.map(sortList(smoothList), toSelectable);
export const forceDirectionOptions: SelectableValue[] = _.map(sortList(forceDirectionList), toSelectable);
export const valignOptions = _.map(sortList(vAlignList), toSelectable);
export const sortMethods = _.map(sortList(hubSizeDirectionList), toSelectable);
export const directionsOptions: SelectableValue[] = _.map(Directions, (label, value) => ({ value, label }));
export const typeOptins: SelectableValue[] = _.map(sortList(typesList), toSelectable);
export const solverOptions: SelectableValue[] = _.map(sortList(solverList), toSelectable);
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');
export const getDefaultValue = (value: object, path: string[]) => _.get(value, path);
export const onChangeValue = (path: string[], value: any, values: object = {}) =>
  _.setWith(values, path.join('.'), value, Object);
