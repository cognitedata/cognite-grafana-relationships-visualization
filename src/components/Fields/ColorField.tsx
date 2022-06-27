import React from 'react';
import { ColorPicker } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const ColorField: React.FC<any> = ({ label, defaultValue, width, onChange, value, path, ...props }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const color = pathValue(path);
  return CustomField(
    label,
    <ColorPicker
      {...{
        onChange: (colorValue: string) => change(colorValue, path),
        enableNamedColors: true,
        color,
        ...props,
      }}
    />,
    {
      alignItems: 'center',
      width,
    }
  );
};