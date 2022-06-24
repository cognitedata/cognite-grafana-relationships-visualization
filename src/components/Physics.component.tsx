import React from 'react';
import { getValue, PHYSICS, values } from '../utils';
import { NumberField, SwitchField } from './Fields';

export const PhysicsEditor: React.FC<any> = ({ value, onChange }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);

  const parent = PHYSICS;

  const physicsMaxVelocityPath = [parent, 'maxVelocity'];
  const physicsMinVelocityPath = [parent, 'minVelocity'];
  const enabledKeyPath = [parent, 'enabled'];

  return (
    <div>
      <SwitchField
        key={enabledKeyPath}
        {...{
          label: 'Enabled',
          onChange,
          path: enabledKeyPath,
          value,
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
          }}
        />,
        <NumberField
          key={'physics.minVelocity'}
          {...{
            label: 'Min Velocity',
            path: physicsMinVelocityPath,
            onChange,
            value,
          }}
        />,
      ]}
    </div>
  );
};
