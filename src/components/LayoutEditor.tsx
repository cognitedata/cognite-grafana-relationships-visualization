import React from 'react';
import { Selectable } from '../types';
import { AVOIDED_KEY, EXTRA_KEY, directionsOptions, getDirection, LAYOUT, sortMethods } from '../utils';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { InputField } from './InputField';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';

export const LayoutEditor: React.FC<any> = ({ change, pathValue }) => {
  const parent = LAYOUT;
  const selector = 'hierarchical';
  const rootExternalIdPath = [EXTRA_KEY, 'rootId'];

  const layoutAvoidCollapsePath = [parent, AVOIDED_KEY];
  const layoutDirectionPath = [parent, selector, 'direction'];
  const layoutLevelSeparationPath = [parent, selector, 'levelSeparation'];
  const layoutNodeSpacingPath = [parent, selector, 'nodeSpacing'];
  const layoutParentCentralizationPath = [parent, selector, 'parentCentralization'];
  const edgeMinimizationPath = [parent, selector, 'edgeMinimization'];
  const layoutBlockShiftingPath = [parent, selector, 'blockShifting'];
  const layoutTreeSpacingPath = [parent, selector, selector, 'treeSpacing'];
  const layoutSortMethodPath = [parent, selector, 'sortMethod'];

  const rootExternalIdPathValue = pathValue(rootExternalIdPath);
  const layoutDirectionPathValue = pathValue(layoutDirectionPath);
  const layoutNodeSpacingPathValue = pathValue(layoutNodeSpacingPath);
  const layoutLevelSeparationPathValue = pathValue(layoutLevelSeparationPath);
  const layoutAvoidCollapsePathValue = pathValue(layoutAvoidCollapsePath);
  const layoutParentCentralizationPathValue = pathValue(layoutParentCentralizationPath);
  const edgeMinimizationPathValue = pathValue(edgeMinimizationPath);
  const layoutBlockShiftingPathValue = pathValue(layoutBlockShiftingPath);
  const layoutTreeSpacingPathValue = pathValue(layoutTreeSpacingPath);
  const layoutSortMethodPathValue = pathValue(layoutSortMethodPath);

  return (
    <CollapsablePanelSection
      key={`${parent}.${AVOIDED_KEY}`}
      {...{
        isOpen: layoutAvoidCollapsePathValue,
        label: 'Layout',
        onToggle: () => change(!layoutAvoidCollapsePathValue, layoutAvoidCollapsePath),
      }}
    >
      <InputField
        key={`${EXTRA_KEY}.externalId`}
        {...{
          onChange: ({ target: { value } }: any) => change(value, rootExternalIdPath),
          label: 'Root ExternalId',
          value: rootExternalIdPathValue,
        }}
      />
      <SelectField
        key="layout.hierarchical.direction"
        {...{
          options: directionsOptions,
          onChange: (selectedValue: Selectable) => change(selectedValue.id, layoutDirectionPath),
          label: 'Direction',
          value: { id: layoutDirectionPathValue, label: getDirection(layoutDirectionPathValue) },
        }}
      />
      {layoutDirectionPathValue !== 'NO' && [
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
    </CollapsablePanelSection>
  );
};
