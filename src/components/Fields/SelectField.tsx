import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDirection, getValue, setValue, upperFirst } from '../utils';
import { SelectedValue } from '../../types';

export const SelectField: React.FC<any> = ({
  label,
  onChange,
  parent,
  value,
  path,
  isDirection,
  selector,
  ...props
}) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);

  return CustomField(
    label,
    <Select
      {...{
        ...props,
        onChange: (target: SelectedValue) => onChange(setValue(path, target.id, parent, selector, value)),
        value: { id: pathValue, label: isDirection ? getDirection(pathValue) : upperFirst(pathValue) },
      }}
    />,
    {}
  );
};
