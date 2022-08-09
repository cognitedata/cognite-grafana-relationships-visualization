import React from 'react';
import { ColorPicker } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDefaultValue } from '../utils';

export const ColorField: React.FC<any> = ({ label, width, onChange, value, path, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <ColorPicker
      {...{
        onChange: (target: string) => onChange(target, path),
        enableNamedColors: false,
        color: pathValue || '',
        ...props,
      }}
    />,
    {
      alignItems: 'center',
      width,
    }
  );
};
