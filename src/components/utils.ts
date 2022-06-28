import _ from 'lodash';
import { defaultGraphValue, hubSizeDirectionList, shapeList, vAlignList } from '../constants';
import { Selectable, Directions } from '../types';

const toSelectable = (id: string): Selectable => ({ id, label: _.upperFirst(id) });
export const shapeOptions: Selectable[] = _.map(shapeList, toSelectable);
export const valignOptions = _.map(vAlignList, toSelectable);
export const sortMethods = _.map(hubSizeDirectionList, toSelectable);
export const directionsOptions: Selectable[] = _.map(Directions, (label, id) => ({ id, label }));
export const getDirection = (direction: string | undefined) => _.get(Directions, direction ?? '');

export const upperFirst = (t: string): string => _.upperFirst(t);

export const getValue = (value: any, path: string[]) => _.get({ ...defaultGraphValue, ...value }, path);
export const setValue = (path: string[], value: any, parent: string[], selector: any, values = {}) =>
  _.set(
    _.filter({ ...defaultGraphValue, ...values }, (v, k) => _.includes(parent, k))[0],
    selector ? [selector, ...path] : path,
    value
  );
