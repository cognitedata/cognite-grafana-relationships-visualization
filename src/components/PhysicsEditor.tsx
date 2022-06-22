import React from 'react';
import { AVOIDED_KEY, PHYSICS } from '../utils';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { NumberField } from './NumberField';
import { SwitchField } from './SwitchField';

export const PhysicsEditor: React.FC<any> = ({ change, pathValue }) => {
  const parent = PHYSICS;
  const physicsAvoidCollapsePath = [parent, AVOIDED_KEY];
  const physicsmaxVelocityPath = [parent, 'maxVelocity'];
  const physicsMinVelocityPath = [parent, 'minVelocity'];
  const enabledKeyPath = `${parent}.enabled`;

  const physicsEnabledPathValue = pathValue(enabledKeyPath);
  const physicsmaxVelocityPathValue = pathValue(physicsmaxVelocityPath);
  const physicsAvoidCollapsePathValue = pathValue(physicsAvoidCollapsePath);
  const physicsMinVelocityPathValue = pathValue(physicsMinVelocityPath);

  return (
    <CollapsablePanelSection
      key={`physics.${AVOIDED_KEY}`}
      {...{
        isOpen: physicsAvoidCollapsePathValue,
        label: 'Physics',
        onToggle: () => change(!physicsAvoidCollapsePathValue, physicsAvoidCollapsePath),
      }}
    >
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
    </CollapsablePanelSection>
  );
};
