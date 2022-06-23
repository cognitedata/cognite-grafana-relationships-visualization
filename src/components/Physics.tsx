import React from 'react';
import { getValue, PHYSICS, setValue, values } from '../utils';
import { NumberField } from './NumberField';
import { SwitchField } from './SwitchField';

export const PhysicsEditor: React.FC<any> = ({ value, onChange }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const parent = PHYSICS;

  const physicsmaxVelocityPath = [parent, 'maxVelocity'];
  const physicsMinVelocityPath = [parent, 'minVelocity'];
  const enabledKeyPath = [parent, 'enabled'];

  const physicsEnabledPathValue = pathValue(enabledKeyPath);
  const physicsmaxVelocityPathValue = pathValue(physicsmaxVelocityPath);
  const physicsMinVelocityPathValue = pathValue(physicsMinVelocityPath);

  return (
    <div>
      <SwitchField
        key={enabledKeyPath}
        {...{
          label: 'Enabled',
          onChange: () => change(!physicsEnabledPathValue, enabledKeyPath),
          value: physicsEnabledPathValue,
        }}
      />
      {physicsEnabledPathValue && [
        <NumberField
          key={'physics.maxVelocity'}
          {...{
            label: 'Max Velocity',
            value: physicsmaxVelocityPathValue,
            onChange: ({ target: { value } }: any) => value && change(parseFloat(value), physicsmaxVelocityPath),
          }}
        />,
        <NumberField
          key={'physics.minVelocity'}
          {...{
            label: 'Min Velocity',
            value: physicsMinVelocityPathValue,
            onChange: ({ target: { value } }: any) => value && change(parseFloat(value), physicsMinVelocityPath),
          }}
        />,
      ]}
    </div>
  );
};
