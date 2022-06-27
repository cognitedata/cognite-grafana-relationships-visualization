import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const NumberField: React.FC<any> = ({ label, value, defaultValue, onChange, path, ...props }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValues, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const valuePath = pathValue(path);

  return CustomField(
    label,
    <Input
      {...{
        value: valuePath,
        ...props,
        onChange: ({ target: { value } }: any) => change(parseFloat(value), path),
      }}
      type="number"
    />,
    {}
  );
};
