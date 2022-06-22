import React from 'react';
import { AVOIDED_KEY } from '../utils';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { NumberField } from './NumberField';
import { SwitchField } from './SwitchField';

const parent = 'physics';
export const PhysicsEditor: React.FC<any> = ({ onChange, setPathValue, pathValue }) => {
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
        onToggle: () => onChange(setPathValue(!physicsAvoidCollapsePathValue, physicsAvoidCollapsePath)),
      }}
    >
      <SwitchField
        key={enabledKeyPath}
        {...{
          label: 'Enabled',
          onChange: () => onChange(setPathValue(!physicsEnabledPathValue, enabledKeyPath)),
          value: physicsEnabledPathValue,
        }}
      />
      <NumberField
        key={'physics.maxVelocity'}
        {...{
          label: 'Max Velocity',
          value: physicsmaxVelocityPathValue,
          onChange: ({ target: { value } }: any) =>
            value && onChange(setPathValue(parseFloat(value), physicsmaxVelocityPath)),
        }}
      />
      <NumberField
        key={'physics.minVelocity'}
        {...{
          label: 'Min Velocity',
          value: physicsMinVelocityPathValue,
          onChange: ({ target: { value } }: any) =>
            value && onChange(setPathValue(parseFloat(value), physicsMinVelocityPath)),
        }}
      />
    </CollapsablePanelSection>
  );
};
