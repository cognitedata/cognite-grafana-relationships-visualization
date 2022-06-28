import React from 'react';
import { NumberField, SwitchField } from './Fields';
import { getValue } from './utils';

export const PhysicsEditor: React.FC<any> = ({ value, onChange, id }) => {
  const pathValues = value && { [id]: value };
  const path = ['enabled'];
  const pathValue = getValue(pathValues, [id, ...path]);
  const fixedProps = {
    onChange,
    value: pathValues,
    parent: [id],
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
            path: [id, 'minVelocity'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={'maxVelocity'}
          {...{
            label: 'Max Velocity',
            path: [id, 'maxVelocity'],
            ...fixedProps,
          }}
        />,
      ]}
    </div>
  );
};
