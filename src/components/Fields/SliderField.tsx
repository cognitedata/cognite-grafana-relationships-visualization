import React from 'react';
import { Slider } from '@grafana/ui';
import { CustomField } from './CustomField';
import { getValue, setValue } from '../utils';

export const SliderField: React.FC<any> = ({ label, onChange, parent, value, path, selector, ...props }) => {
  const fullPath = selector ? [...parent, selector, ...path] : [...parent, ...path];
  const pathValue = getValue(value, fullPath);
  return CustomField(
    label,
    <Slider
      {...{
        ...props,
        onChange: (target: number) => onChange(setValue(path, target, parent, selector, value)),
        value: pathValue,
      }}
    />,
    {}
  );
};
