import React from 'react';
import { ColorPicker } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue } from '../utils';

export const ColorField: React.FC<any> = ({ label, parent, width, onChange, value, path, selector, ...props }) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);

  return CustomField(
    label,
    <ColorPicker
      {...{
        onChange: (target: string) => onChange(setValue(path, target, parent, selector, value)),
        enableNamedColors: true,
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
