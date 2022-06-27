import React from 'react';
import { directionsOptions, sortMethods, getValue, values } from '../utils';
import { NumberField, SelectField, SwitchField } from './Fields';
import { LAYOUT } from '../constants';

export const LayoutEditor: React.FC<any> = (props) => {
  const {
    value,
    onChange,
    item: { defaultValue },
  } = props;
  const defaultValues = values(value, defaultValue);

  const selector = 'hierarchical';
  const enabledPath = [selector, 'enabled'];

  const layoutDirectionPath = [selector, 'direction'];
  const layoutLevelSeparationPath = [selector, 'levelSeparation'];
  const layoutNodeSpacingPath = [selector, 'nodeSpacing'];
  const layoutParentCentralizationPath = [selector, 'parentCentralization'];
  const edgeMinimizationPath = [selector, 'edgeMinimization'];
  const layoutBlockShiftingPath = [selector, 'blockShifting'];
  const layoutTreeSpacingPath = [selector, 'treeSpacing'];
  const layoutSortMethodPath = [selector, 'sortMethod'];

  const pathValue = (path: string[]) => getValue(defaultValues, path);
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
          defaultValue,
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
            defaultValue,
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
            defaultValue,
          }}
        />,
        <NumberField
          key="layout.levelSeparation"
          {...{
            value,
            onChange,
            label: 'Level Separation',
            path: layoutLevelSeparationPath,
            defaultValue,
          }}
        />,
        <NumberField
          key="layout.hierarchical.nodeSpacing"
          {...{
            value,
            onChange,
            label: 'Node Spacing',
            path: layoutNodeSpacingPath,
            defaultValue,
          }}
        />,
        <NumberField
          key="layout.hierarchical.treeSpacing"
          {...{
            value,
            onChange,
            label: 'Tree Spacing',
            path: layoutTreeSpacingPath,
            defaultValue,
          }}
        />,
        <SwitchField
          key="layouthierarchical.hierarchical.parentCentralization"
          {...{
            value,
            onChange,
            label: 'Parent Centralization',
            path: layoutParentCentralizationPath,
            defaultValue,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.blockShifting"
          {...{
            value,
            onChange,
            label: 'Block Shifting',
            path: layoutBlockShiftingPath,
            defaultValue,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.edgeMinimization"
          {...{
            value,
            onChange,
            label: 'Edge Minimization',
            path: edgeMinimizationPath,
            defaultValue,
          }}
        />,
      ]}
    </div>
  );
};
