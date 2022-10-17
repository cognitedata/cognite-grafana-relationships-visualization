import React, { useMemo } from 'react';
import { NumberField, SelectField, SwitchField } from './Fields';
import { getDefaultValue, onChangeValue, solverOptions } from './utils';

export const PhysicsEditor: React.FC<any> = ({ item: { defaultValue }, value, onChange, item }) => {
  const path = ['enabled'];
  const pathValue = getDefaultValue(value, path);
  const fixedProps = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value: useMemo(() => {
      if (!value) {
        onChange(defaultValue);
        return defaultValue;
      }
      return value;
    }, [value]),
  };
  return (
    <div>
      <SwitchField
        key={'enabled'}
        {...{
          label: 'Enabled',
          path,
          ...fixedProps,
        }}
      />
      {pathValue && [
        <NumberField
          key={'minVelocity'}
          {...{
            label: 'Min Velocity',
            path: ['minVelocity'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={'maxVelocity'}
          {...{
            label: 'Max Velocity',
            path: ['maxVelocity'],
            ...fixedProps,
          }}
        />,
        <SelectField
          key={'solver'}
          {...{
            options: solverOptions,
            label: 'Solver',
            path: ['solver'],
            ...fixedProps,
          }}
        />,
      ]}
    </div>
  );
};
