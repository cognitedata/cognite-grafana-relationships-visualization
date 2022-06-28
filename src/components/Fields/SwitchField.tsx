import React from 'react';
import { Switch } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue } from '../utils';

export const SwitchField: React.FC<any> = ({ label, onChange, value, path, parent, selector, ...props }) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);
  return CustomField(
    label,
    <Switch
      {...{
        ...props,
        onChange: () => onChange(setValue(path, !pathValue, parent, selector, value)),
        value: pathValue,
      }}
    />,
    {}
  );
};
