import React from 'react';
import { NumberField, SwitchField } from './Fields';
import { getDefaultValue, onChangeValue } from './utils';

export const PhysicsEditor: React.FC<any> = ({ value, onChange, item }) => {
  const path = ['enabled'];
  const pathValue = getDefaultValue(value, path);
  const fixedProps = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value,
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
      ]}
    </div>
  );
};
