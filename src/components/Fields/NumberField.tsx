import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const NumberField: React.FC<any> = ({ label, value, onChange, path, ...props }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
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
