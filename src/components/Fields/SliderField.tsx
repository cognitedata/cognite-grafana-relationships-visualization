import React from 'react';
import { Slider } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue, values } from '../../utils';

export const SliderField: React.FC<any> = ({ label, onChange, defaultValue, value, path, ...props }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValues, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  return CustomField(
    label,
    <Slider
      {...{
        ...props,
        onChange: (selectedValue: number) => change(selectedValue, path),
        value: pathValue(path),
      }}
    />,
    {}
  );
};
