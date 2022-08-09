import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDirection, getDefaultValue, upperFirst } from '../utils';
import { SelectedValue } from '../../types';

export const SelectField: React.FC<any> = ({ label, onChange, value, path, isDirection, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Select
      {...{
        ...props,
        onChange: (target: SelectedValue) => onChange(target.id, path),
        value: { id: pathValue, label: isDirection ? getDirection(pathValue) : upperFirst(pathValue) },
      }}
    />,
    {}
  );
};
