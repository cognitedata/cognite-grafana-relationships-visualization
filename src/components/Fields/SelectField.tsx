import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDirection, getDefaultValue, upperFirst } from '../utils';
import { SelectableValue } from '@grafana/data';

export const SelectField: React.FC<any> = ({ label, onChange, value, path, isDirection, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Select
      {...{
        ...props,
        onChange: (target: SelectableValue) => {
          return onChange(target.value, path);
        },
        value: { value: pathValue, label: isDirection ? getDirection(pathValue) : upperFirst(pathValue) },
      }}
    />,
    {}
  );
};
