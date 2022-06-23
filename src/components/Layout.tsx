import React from 'react';
import { Selectable } from '../types';
import { directionsOptions, getDirection, LAYOUT, sortMethods, getValue, setValue, values } from '../utils';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';

export const LayoutEditor: React.FC<any> = ({ value, onChange }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));

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

  const enabledPathValue = pathValue(enabledPath);
  const layoutDirectionPathValue = pathValue(layoutDirectionPath);
  const layoutNodeSpacingPathValue = pathValue(layoutNodeSpacingPath);
  const layoutLevelSeparationPathValue = pathValue(layoutLevelSeparationPath);
  const layoutParentCentralizationPathValue = pathValue(layoutParentCentralizationPath);
  const edgeMinimizationPathValue = pathValue(edgeMinimizationPath);
  const layoutBlockShiftingPathValue = pathValue(layoutBlockShiftingPath);
  const layoutTreeSpacingPathValue = pathValue(layoutTreeSpacingPath);
  const layoutSortMethodPathValue = pathValue(layoutSortMethodPath);

  return (
    <div>
      <SwitchField
        key={`${LAYOUT}.hierarchical.enabled`}
        {...{
          onChange: () => change(!enabledPathValue, enabledPath),
          label: 'Enabled',
          value: enabledPathValue,
        }}
      />
      {enabledPathValue && [
        <SelectField
          key="layout.hierarchical.direction"
          {...{
            options: directionsOptions,
            onChange: (selectedValue: Selectable) => change(selectedValue.id, layoutDirectionPath),
            label: 'Direction',
            value: { id: layoutDirectionPathValue, label: getDirection(layoutDirectionPathValue) },
          }}
        />,

        <SelectField
          key="layout.hierarchical.sortMethod"
          {...{
            options: sortMethods,
            onChange: (selectedValue: Selectable) => change(selectedValue.id, layoutSortMethodPath),
            label: 'Sort Method',
            value: { id: layoutSortMethodPathValue, label: getDirection(layoutSortMethodPathValue) },
          }}
        />,
        <NumberField
          key="layout.levelSeparation"
          {...{
            onChange: ({ target: { value } }: any) => change(parseFloat(value), layoutLevelSeparationPath),
            label: 'Level Separation',
            value: layoutLevelSeparationPathValue,
          }}
        />,
        <NumberField
          key="layout.hierarchical.nodeSpacing"
          {...{
            onChange: ({ target: { value } }: any) => change(parseFloat(value), layoutNodeSpacingPath),
            label: 'Node Spacing',
            value: layoutNodeSpacingPathValue,
          }}
        />,
        <NumberField
          key="layout.hierarchical.treeSpacing"
          {...{
            onChange: ({ target: { value } }: any) => change(parseFloat(value), layoutTreeSpacingPath),
            label: 'Tree Spacing',
            value: layoutTreeSpacingPathValue,
          }}
        />,
        <SwitchField
          key="layouthierarchical.hierarchical.parentCentralization"
          {...{
            onChange: () => change(!layoutParentCentralizationPathValue, layoutParentCentralizationPath),
            label: 'Parent Centralization',
            value: layoutParentCentralizationPathValue,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.blockShifting"
          {...{
            onChange: () => change(!layoutBlockShiftingPathValue, layoutBlockShiftingPath),
            label: 'Block Shifting',
            value: layoutBlockShiftingPathValue,
          }}
        />,
        <SwitchField
          key="layout.hierarchical.edgeMinimization"
          {...{
            onChange: () => change(!edgeMinimizationPathValue, edgeMinimizationPath),
            label: 'Edge Minimization',
            value: edgeMinimizationPathValue,
          }}
        />,
      ]}
    </div>
  );
};
