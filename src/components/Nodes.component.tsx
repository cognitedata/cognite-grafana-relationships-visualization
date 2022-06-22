import React from 'react';
import { SelectedValue } from '../types';
import { NODES, shapeOptions, sizableList, tabLabel } from '../utils';
import { ColorField } from './ColorField';
import { ColorFields } from './ColorFields';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';

export const Nodes: React.FC<any> = ({ change, pathValue, groupsAvoidTabPathValue }) => {
  const groupPath = groupsAvoidTabPathValue === NODES ? [groupsAvoidTabPathValue] : ['groups', groupsAvoidTabPathValue];

  const groupsShapePath = [...groupPath, 'shape'];
  const groupsColorBackgroundPath = [...groupPath, 'color', 'background'];
  const groupsColorBorderPath = [...groupPath, 'color', 'border'];
  const groupsFontColorPath = [...groupPath, 'font', 'color'];
  const groupsSizePath = [...groupPath, 'size'];
  const nodesWidthConstraintMinimumPath = [NODES, 'widthConstraint', 'minimum'];
  const nodesWidthConstraintMaximumPath = [NODES, 'widthConstraint', 'maximum'];
  const nodesWidthConstraintPath = [NODES, 'widthConstraint', 'enable'];
  const groupsShapePathValue = pathValue(groupsShapePath);
  const groupsColorBackgroundPathValue = pathValue(groupsColorBackgroundPath);
  const groupsColorBorderPathValue = pathValue(groupsColorBorderPath);
  const groupsFontColorPathValue = pathValue(groupsFontColorPath);
  const nodesWidthConstraintMinimumPathValue = pathValue(nodesWidthConstraintMinimumPath);
  const nodesWidthConstraintMaximumPathValue = pathValue(nodesWidthConstraintMaximumPath);
  const nodesWidthConstraintPathValue = pathValue(nodesWidthConstraintPath);
  const groupsSizePathValue = pathValue(groupsSizePath);
  // oslo_production_mix_tank

  const style = { padding: 8 };
  return (
    <div style={style} key={'groups'}>
      {ColorFields(
        <div className="holder">
          <ColorField
            key={'groups.color.background'}
            {...{
              label: 'Background',
              onChange: (colorValue: string) => change(colorValue, groupsColorBackgroundPath),
              color: groupsColorBackgroundPathValue,
              width: '33%',
            }}
          />
          <ColorField
            key={'groups.color.border'}
            {...{
              label: 'Border',
              onChange: (colorValue: string) => change(colorValue, groupsColorBorderPath),
              color: groupsColorBorderPathValue,
              width: '33%',
            }}
          />
          <ColorField
            key={'groups.font.color'}
            {...{
              label: 'Font',
              color: groupsFontColorPathValue,
              width: '33%',
              onChange: (colorValue: string) => change(colorValue, groupsFontColorPath),
            }}
          />
        </div>
      )}
      <SelectField
        key={'groups.shape'}
        {...{
          options: shapeOptions,
          onChange: (selectedValue: SelectedValue) => change(selectedValue.id, groupsShapePath),
          label: 'Shape',
          value: {
            id: groupsShapePathValue,
            label: tabLabel(groupsShapePathValue),
          },
          style: { padding: 8 },
        }}
      />
      {sizableList.includes(groupsShapePathValue) && (
        <SliderField
          key={'groups.size'}
          {...{
            label: 'Size',
            value: groupsSizePathValue,
            onChange: (selectedValue: number) => change(selectedValue, groupsSizePath),
            min: 10,
            max: 100,
          }}
        />
      )}
      {groupsAvoidTabPathValue === NODES && (
        <SwitchField
          key={`${NODES}.widthConstraint`}
          {...{
            label: 'Width Constraint',
            onChange: () => change(!nodesWidthConstraintPathValue, nodesWidthConstraintPath),
            value: nodesWidthConstraintPathValue,
          }}
        />
      )}
      {nodesWidthConstraintPathValue && [
        <NumberField
          key={`${NODES}.widthConstraint.minimum`}
          {...{
            label: 'Width Constraint Minimum',
            onChange: ({ target: { value } }: any) => change(parseFloat(value), nodesWidthConstraintMinimumPath),
            value: nodesWidthConstraintMinimumPathValue || 1,
          }}
        />,
        <NumberField
          key={`${NODES}.widthConstraint.maximum`}
          {...{
            label: 'Width Constraint Maximum',
            onChange: ({ target: { value } }: any) => change(parseFloat(value), nodesWidthConstraintMaximumPath),
            value: nodesWidthConstraintMaximumPathValue,
          }}
        />,
      ]}
    </div>
  );
};
