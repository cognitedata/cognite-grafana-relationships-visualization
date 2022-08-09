import _ from 'lodash';
import { hubSizeDirectionList, shapeList, vAlignList } from '../constants';
import { Selectable, Directions } from '../types';

const toSelectable = (id: string): Selectable => ({ id, label: _.upperFirst(id) });
export const shapeOptions: Selectable[] = _.map(shapeList, toSelectable);
export const valignOptions = _.map(vAlignList, toSelectable);
export const sortMethods = _.map(hubSizeDirectionList, toSelectable);
export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');
export const upperFirst = (t: string): string => _.upperFirst(t);
export const onChangeValue = (path: string[], value: any, values: object = {}) =>
  _.setWith(values, path.join('.'), value, Object);
export const getDefaultValue = (value: object, path: string[]) => _.get(value, path);
