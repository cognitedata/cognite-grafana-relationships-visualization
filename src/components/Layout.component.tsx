import React from 'react';
import { directionsOptions, getDefaultValue, onChangeValue, sortMethods } from './utils';
import { NumberField, SelectField, SwitchField } from './Fields';

export const LayoutEditor: React.FC<any> = ({ value, onChange }) => {
  const path = ['hierarchical', 'enabled'];
  const pathValue = getDefaultValue(value, path);
  const fixedProps = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value,
  };
  return (
    <div>
      <SwitchField
        key={'hierarchical.enabled'}
        {...{
          label: 'Enabled',
          path,
          ...fixedProps,
        }}
      />
      {pathValue && [
        <SelectField
          key={`hierarchical.direction`}
          {...{
            label: 'Direction',
            path: ['hierarchical', 'direction'],
            options: directionsOptions,
            isDirection: true,
            ...fixedProps,
          }}
        />,
        <SelectField
          key={`hierarchical.sortMethod`}
          {...{
            label: 'Sort Method',
            path: ['hierarchical', 'sortMethod'],
            options: sortMethods,
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`levelSeparation`}
          {...{
            label: 'Level Separation',
            path: ['hierarchical', 'levelSeparation'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`hierarchical.nodeSpacing`}
          {...{
            label: 'Node Spacing',
            path: ['hierarchical', 'nodeSpacing'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`hierarchical.treeSpacing`}
          {...{
            label: 'Tree Spacing',
            path: ['hierarchical', 'treeSpacing'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`hierarchical.parentCentralization`}
          {...{
            label: 'Parent Centralization',
            path: ['hierarchical', 'parentCentralization'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`hierarchical.blockShifting`}
          {...{
            label: 'Block Shifting',
            path: ['hierarchical', 'blockShifting'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`hierarchical.edgeMinimization`}
          {...{
            label: 'Edge Minimization',
            path: ['hierarchical', 'edgeMinimization'],
            ...fixedProps,
          }}
        />,
      ]}
    </div>
  );
};
