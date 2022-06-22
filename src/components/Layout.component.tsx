import React from 'react';
import { Selectable } from '../types';
import { EXTRA_KEY, directionsOptions, getDirection } from '../utils';
import { InputField } from './InputField';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
// @ts-ignore
export const Layout = ({ onChange, setPathValue, pathValue }) => {
  const parent = 'layout';
  const rootExternalIdPath = [EXTRA_KEY, 'rootId'];

  const layoutDirectionPath = [parent, 'hierarchical', 'direction'];
  const layoutLevelSeparationPath = [parent, 'hierarchical', 'levelSeparation'];
  const layoutNodeSpacingPath = [parent, 'hierarchical', 'nodeSpacing'];
  const layoutParentCentralizationPath = [parent, 'hierarchical', 'parentCentralization'];

  const rootExternalIdPathValue = pathValue(rootExternalIdPath);

  const layoutDirectionPathValue = pathValue(layoutDirectionPath);
  const layoutNodeSpacingPathValue = pathValue(layoutNodeSpacingPath);
  const layoutLevelSeparationPathValue = pathValue(layoutLevelSeparationPath);
  const layoutParentCentralizationPathValue = pathValue(layoutParentCentralizationPath);
  return [
    <InputField
      key="layout.externalId"
      {...{
        onChange: ({ target: { value } }: any) => onChange(setPathValue(value, rootExternalIdPath)),
        label: 'Root ExternalId',
        value: rootExternalIdPathValue,
      }}
    />,
    layoutDirectionPathValue !== 'NO' && [
      <NumberField
        key="layout.levelSeparation"
        {...{
          onChange: ({ target: { value } }: any) =>
            onChange(setPathValue(parseFloat(value), layoutLevelSeparationPath)),
          label: 'Level Separation',
          value: layoutLevelSeparationPathValue,
        }}
      />,
      <NumberField
        key="layout.nodeSpacing"
        {...{
          onChange: ({ target: { value } }: any) => onChange(setPathValue(parseFloat(value), layoutNodeSpacingPath)),
          label: 'Node Spacing',
          value: layoutNodeSpacingPathValue,
        }}
      />,
      <SwitchField
        key="layout.parentCentralization"
        {...{
          onChange: () => onChange(setPathValue(!layoutParentCentralizationPathValue, layoutParentCentralizationPath)),
          label: 'Parent Centralization',
          value: layoutParentCentralizationPathValue,
        }}
      />,
    ],
    <SelectField
      key="layout.direction"
      {...{
        options: directionsOptions,
        onChange: (selectedValue: Selectable) => onChange(setPathValue(selectedValue.id, layoutDirectionPath)),
        label: 'Direction',
        value: { id: layoutDirectionPathValue, label: getDirection(layoutDirectionPathValue) },
      }}
    />,
  ];
};
