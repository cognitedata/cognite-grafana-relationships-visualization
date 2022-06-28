import React from 'react';
import { directionsOptions, getValue, sortMethods } from './utils';
import { NumberField, SelectField, SwitchField } from './Fields';

export const LayoutEditor: React.FC<any> = ({ value, onChange, id }) => {
  const pathValues = value && { [id]: value };
  const path = ['hierarchical', 'enabled'];
  const pathValue = getValue(pathValues, [id, ...path]);
  const fixedProps = {
    onChange,
    value: pathValue,
    parent: [id],
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
          key={`${id}.hierarchical.sortMethod`}
          {...{
            label: 'Sort Method',
            path: ['hierarchical', 'sortMethod'],
            options: sortMethods,
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`${id}.levelSeparation`}
          {...{
            label: 'Level Separation',
            path: ['hierarchical', 'levelSeparation'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`${id}.hierarchical.nodeSpacing`}
          {...{
            label: 'Node Spacing',
            path: ['hierarchical', 'nodeSpacing'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`${id}.hierarchical.treeSpacing`}
          {...{
            label: 'Tree Spacing',
            path: ['hierarchical', 'treeSpacing'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`${id}.hierarchical.parentCentralization`}
          {...{
            label: 'Parent Centralization',
            path: ['hierarchical', 'parentCentralization'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`${id}.hierarchical.blockShifting`}
          {...{
            label: 'Block Shifting',
            path: ['hierarchical', 'blockShifting'],
            ...fixedProps,
          }}
        />,
        <SwitchField
          key={`${id}.hierarchical.edgeMinimization`}
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
