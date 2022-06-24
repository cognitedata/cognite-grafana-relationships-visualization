import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const InputField: React.FC<any> = ({ label, onChange, value, path, ...props }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));

  return CustomField(
    label,
    <Input
      {...{
        ...props,
        onChange: ({ target: { value } }: any) => change(value, path),
        value: pathValue(path),
      }}
    />,
    {}
  );
};
