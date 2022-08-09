import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDefaultValue } from '../utils';

export const NumberField: React.FC<any> = ({ label, value, onChange, path, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Input
      type="number"
      {...{
        ...props,
        onChange: ({ target }: any) => onChange(parseFloat(target.value), path),
        value: pathValue,
      }}
    />,
    {}
  );
};
