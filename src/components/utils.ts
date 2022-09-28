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
import { Selectable, Directions } from '../types';

const sortList = (list: string[]): string[] => _.sortBy(list);
const toSelectable = (id: string): Selectable => ({ id, label: _.upperFirst(id) });
export const shapeOptions: Selectable[] = _.map(sortList(shapeList), toSelectable);
export const smoothOptions: Selectable[] = _.map(sortList(smoothList), toSelectable);
export const forceDirectionOptions: Selectable[] = _.map(sortList(forceDirectionList), toSelectable);
export const valignOptions = _.map(sortList(vAlignList), toSelectable);
export const sortMethods = _.map(sortList(hubSizeDirectionList), toSelectable);
export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
export const typeOptins: Selectable[] = _.map(sortList(typesList), toSelectable);
export const solverOptions: Selectable[] = _.map(sortList(solverList), toSelectable);
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');
export const upperFirst = (t: string): string => _.upperFirst(t);
export const getDefaultValue = (value: object, path: string[]) => _.get(value, path);
export const onChangeValue = (path: string[], value: any, values: object = {}) =>
  _.setWith(values, path.join('.'), value, Object);
