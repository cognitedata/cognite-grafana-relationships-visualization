import React from 'react';
import { getValue, values } from '../utils';
import { NumberField, SwitchField } from './Fields';

export const PhysicsEditor: React.FC<any> = ({ value, onChange, item: { defaultValue } }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);

  const physicsMaxVelocityPath = ['maxVelocity'];
  const physicsMinVelocityPath = ['minVelocity'];
  const enabledKeyPath = ['enabled'];

  return (
    <div>
      <SwitchField
        key={enabledKeyPath}
        {...{
          label: 'Enabled',
          onChange,
          path: enabledKeyPath,
          value,
          defaultValue,
        }}
      />
      {pathValue(enabledKeyPath) && [
        <NumberField
          key={'physics.maxVelocity'}
          {...{
            label: 'Max Velocity',
            path: physicsMaxVelocityPath,
            onChange,
            value,
            defaultValue,
          }}
        />,
        <NumberField
          key={'physics.minVelocity'}
          {...{
            label: 'Min Velocity',
            path: physicsMinVelocityPath,
            onChange,
            value,
            defaultValue,
          }}
        />,
      ]}
    </div>
  );
};
