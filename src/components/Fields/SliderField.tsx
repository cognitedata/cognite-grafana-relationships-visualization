import React from 'react';
import { Slider } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getDefaultValue } from '../utils';

export const SliderField: React.FC<any> = ({ label, onChange, value, path, ...props }) => {
  const pathValue = getDefaultValue(value, path);
  return CustomField(
    label,
    <Slider
      {...{
        ...props,
        onChange: (target: number) => onChange(target, path),
        value: pathValue,
      }}
    />,
    {}
  );
};
