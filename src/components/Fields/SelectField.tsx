import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDirection, getValue, setValue, tabLabel, values } from '../../utils';
import { SelectedValue } from '../../types';

export const SelectField: React.FC<any> = ({ label, onChange, value, path, isDirection, ...props }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const valuePath = pathValue(path);
  return CustomField(
    label,
    <Select
      {...{
        ...props,
        onChange: (selectedValue: SelectedValue) => change(selectedValue.id, path),
        value: { id: valuePath, label: isDirection ? getDirection(valuePath) : tabLabel(valuePath) },
      }}
    />,
    {}
  );
};
