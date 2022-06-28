import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue } from '../utils';

export const InputField: React.FC<any> = ({ label, onChange, parent, value, path, selector, ...props }) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);

  return CustomField(
    label,
    <Input
      {...{
        ...props,
        onChange: ({ target }: any) => onChange(setValue(path, target.value, parent, selector, value)),
        value: pathValue,
      }}
    />,
    {}
  );
};
