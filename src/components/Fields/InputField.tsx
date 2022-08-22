import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDefaultValue } from '../utils';

export const InputField: React.FC<any> = ({ label, onChange, value, path, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Input
      {...{
        ...props,
        onChange: ({ target }: any) => onChange(target.value, path),
        value: pathValue,
      }}
    />,
    {}
  );
};
