import React from 'react';
import { SelectedValue } from '../types';
import { AVOIDABLE_ENABLED, NODES, shapeOptions, sizableList, tabLabel, valignOptions } from '../utils';
import { ColorField } from './ColorField';
import { ColorFields } from './ColorFields';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';

export const Nodes: React.FC<any> = ({ change, pathValue, label }) => {
  const groupPath = label === NODES ? [label] : ['groups', label];

  const groupsShapePath = [...groupPath, 'shape'];
  const groupsColorBackgroundPath = [...groupPath, 'color', 'background'];
  const groupsColorBorderPath = [...groupPath, 'color', 'border'];
  const groupsFontColorPath = [...groupPath, 'font', 'color'];
  const groupsSizePath = [...groupPath, 'size'];
  const groupsWidthConstraintPath = [...groupPath, 'widthConstraint', AVOIDABLE_ENABLED];
  const groupsWidthConstraintMinimumPath = [...groupPath, 'widthConstraint', 'minimum'];
  const groupsWidthConstraintMaximumPath = [...groupPath, 'widthConstraint', 'maximum'];
  const groupsHeightConstraintPath = [...groupPath, 'heightConstraint', AVOIDABLE_ENABLED];
  const groupsHeightConstraintMinimumPath = [...groupPath, 'heightConstraint', 'minimum'];
  const groupsHeightConstraintValignPath = [...groupPath, 'heightConstraint', 'valign'];

  const groupsShapePathValue = pathValue(groupsShapePath);
  const groupsColorBackgroundPathValue = pathValue(groupsColorBackgroundPath);
  const groupsColorBorderPathValue = pathValue(groupsColorBorderPath);
  const groupsFontColorPathValue = pathValue(groupsFontColorPath);
  const groupsWidthConstraintMinimumPathValue = pathValue(groupsWidthConstraintMinimumPath);
  const groupsWidthConstraintMaximumPathValue = pathValue(groupsWidthConstraintMaximumPath);
  const groupsWidthConstraintPathValue = pathValue(groupsWidthConstraintPath);
  const groupsHeightConstraintPathValue = pathValue(groupsHeightConstraintPath);
  const groupsHeightConstraintMinimumPathValue = pathValue(groupsHeightConstraintMinimumPath);
  const groupsHeightConstraintValignPathValue = pathValue(groupsHeightConstraintValignPath);

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
      <SwitchField
        key={`${NODES}.widthConstraint`}
        {...{
          label: 'Width Constraint',
          onChange: () => change(!groupsWidthConstraintPathValue, groupsWidthConstraintPath),
          value: groupsWidthConstraintPathValue,
        }}
      />
      {groupsWidthConstraintPathValue && [
        <NumberField
          key={`${NODES}.widthConstraint.minimum`}
          {...{
            label: 'Width Constraint Minimum',
            onChange: ({ target: { value } }: any) => change(parseFloat(value), groupsWidthConstraintMinimumPath),
            value: groupsWidthConstraintMinimumPathValue || 1,
          }}
        />,
        <NumberField
          key={`${NODES}.widthConstraint.maximum`}
          {...{
            label: 'Width Constraint Maximum',
            onChange: ({ target: { value } }: any) => change(parseFloat(value), groupsWidthConstraintMaximumPath),
            value: groupsWidthConstraintMaximumPathValue,
          }}
        />,
      ]}
      <SwitchField
        key={`${NODES}.widthConstraint`}
        {...{
          label: 'Height Constraint',
          onChange: () => change(!groupsHeightConstraintPathValue, groupsHeightConstraintPath),
          value: groupsHeightConstraintPathValue,
        }}
      />
      {groupsHeightConstraintPathValue && [
        <NumberField
          key={`${NODES}.widthConstraint.minimum`}
          {...{
            label: 'Height Constraint Minimum',
            onChange: ({ target: { value } }: any) => change(parseFloat(value), groupsHeightConstraintMinimumPath),
            value: groupsHeightConstraintMinimumPathValue || 1,
          }}
        />,
        <SelectField
          key={`${NODES}.heightConstraint.valign`}
          {...{
            options: valignOptions,
            label: 'Height Constraint Valign',
            onChange: (selectedValue: SelectedValue) => change(selectedValue.id, groupsHeightConstraintValignPath),
            value: {
              id: groupsHeightConstraintValignPathValue || 'middle',
              label: tabLabel(groupsHeightConstraintValignPathValue) || 'Middle',
            },
          }}
        />,
      ]}
    </div>
  );
};
