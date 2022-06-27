import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDirection, getValue, setValue, upperFirst, values } from '../../utils';
import { SelectedValue } from '../../types';

export const SelectField: React.FC<any> = ({ label, onChange, defaultValue, value, path, isDirection, ...props }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValues, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const valuePath = pathValue(path);
  return CustomField(
    label,
    <Select
      {...{
        ...props,
        onChange: (selectedValue: SelectedValue) => change(selectedValue.id, path),
        value: { id: valuePath, label: isDirection ? getDirection(valuePath) : upperFirst(valuePath) },
      }}
    />,
    {}
  );
};
