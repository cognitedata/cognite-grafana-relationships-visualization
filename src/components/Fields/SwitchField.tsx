import React from 'react';
import { Switch } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDefaultValue } from '../utils';

export const SwitchField: React.FC<any> = ({ onChange, label, value, path, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Switch
      {...{
        ...props,
        onChange: () => onChange(!pathValue, path),
        value: pathValue,
      }}
    />,
    {}
  );
};
