import React from 'react';
import { directionsOptions, LAYOUT, sortMethods, getValue, values } from '../utils';
import { NumberField, SelectField, SwitchField } from './Fields';

export const LayoutEditor: React.FC<any> = ({ value, onChange }) => {
  const defaultValue = values(value);

  const parent = LAYOUT;
  const selector = 'hierarchical';
  const enabledPath = [parent, selector, 'enabled'];

  const layoutDirectionPath = [parent, selector, 'direction'];
  const layoutLevelSeparationPath = [parent, selector, 'levelSeparation'];
  const layoutNodeSpacingPath = [parent, selector, 'nodeSpacing'];
  const layoutParentCentralizationPath = [parent, selector, 'parentCentralization'];
  const edgeMinimizationPath = [parent, selector, 'edgeMinimization'];
  const layoutBlockShiftingPath = [parent, selector, 'blockShifting'];
  const layoutTreeSpacingPath = [parent, selector, 'treeSpacing'];
  const layoutSortMethodPath = [parent, selector, 'sortMethod'];

  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const enabledPathValue = pathValue(enabledPath);

  return (
    <div>
      <SwitchField
        key={`${LAYOUT}.hierarchical.enabled`}
        {...{
          onChange,
          label: 'Enabled',
          path: enabledPath,
          value,
        }}
      />
      {enabledPathValue && [
        <SelectField
          key="layout.hierarchical.direction"
          {...{
            options: directionsOptions,
            onChange,
            label: 'Direction',
            path: layoutDirectionPath,
            value,
            isDirection: true,
          }}
        />,

        <SelectField
          key="layout.hierarchical.sortMethod"
          {...{
            options: sortMethods,
            onChange,
            label: 'Sort Method',
            path: layoutSortMethodPath,
            value,
          }}
        />,
        <NumberField
          key="layout.levelSeparation"
          {...{
            value,
            onChange,
            label: 'Level Separation',
            path: layoutLevelSeparationPath,
          }}
        />,
        <NumberField
          key="layout.hierarchical.nodeSpacing"
          {...{
            value,
            onChange,
            label: 'Node Spacing',
            path: layoutNodeSpacingPath,
          }}
        />,
        <NumberField
          key="layout.hierarchical.treeSpacing"
          {...{
            value,
            onChange,
            label: 'Tree Spacing',
            path: layoutTreeSpacingPath,
          }}
        />,
        <SwitchField
          key="layouthierarchical.hierarchical.parentCentralization"
          {...{
            value,
            onChange,
            label: 'Parent Centralization',
            path: layoutParentCentralizationPath,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.blockShifting"
          {...{
            value,
            onChange,
            label: 'Block Shifting',
            path: layoutBlockShiftingPath,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.edgeMinimization"
          {...{
            value,
            onChange,
            label: 'Edge Minimization',
            path: edgeMinimizationPath,
          }}
        />,
      ]}
    </div>
  );
};
