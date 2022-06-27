import React from 'react';
import { Switch } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const SwitchField: React.FC<any> = ({ label, onChange, defaultValue, value, path, ...props }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValues, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const valuePath = pathValue(path);
  return CustomField(
    label,
    <Switch
      {...{
        ...props,
        onChange: () => change(!valuePath, path),
        value: valuePath,
      }}
    />,
    {}
  );
};
