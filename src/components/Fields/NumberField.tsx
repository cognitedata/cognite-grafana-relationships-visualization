import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue } from '../utils';

export const NumberField: React.FC<any> = ({ label, value, parent, onChange, path, selector, ...props }) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);

  return CustomField(
    label,
    <Input
      type="number"
      {...{
        ...props,
        onChange: ({ target }: any) => onChange(setValue(path, parseFloat(target.value), parent, selector, value)),
        value: pathValue,
      }}
    />,
    {}
  );
};
