import React from 'react';
import { getValue, shapeOptions, valignOptions, values } from '../utils';
import { ColorField, ColorFields, NumberField, SelectField, SliderField, SwitchField } from './Fields';
import { AVOIDABLE_ENABLED, NODES, sizableList } from '../constants';

export const Nodes: React.FC<any> = ({ onChange, defaultValue, value, label }) => {
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
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
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
              value,
              onChange,
              path: groupsColorBackgroundPath,
              width: '33%',
              defaultValue,
            }}
          />
          <ColorField
            key={'groups.color.border'}
            {...{
              value,
              label: 'Border',
              onChange,
              path: groupsColorBorderPath,
              width: '33%',
              defaultValue,
            }}
          />
          <ColorField
            key={'groups.font.color'}
            {...{
              label: 'Font',
              path: groupsFontColorPath,
              width: '33%',
              onChange,
              value,
              defaultValue,
            }}
          />
        </div>
      )}
      <SelectField
        key={'groups.shape'}
        {...{
          options: shapeOptions,
          onChange,
          label: 'Shape',
          value,
          path: groupsShapePath,
          defaultValue,
        }}
      />
      {sizableList.includes(pathValue(groupsShapePath)) && (
        <SliderField
          key={'groups.size'}
          {...{
            label: 'Size',
            path: groupsSizePath,
            value,
            onChange,
            min: 10,
            max: 100,
            defaultValue,
          }}
        />
      )}
      <SwitchField
        key={`${groupPath.join('.')}.widthConstraint`}
        {...{
          value,
          label: 'Width Constraint',
          onChange,
          path: groupsWidthConstraintPath,
          defaultValue,
        }}
      />
      {pathValue(groupsWidthConstraintPath) && [
        <NumberField
          key={`${groupPath.join('.')}.widthConstraint.minimum`}
          {...{
            label: 'Width Constraint Minimum',
            value,
            onChange,
            path: groupsWidthConstraintMinimumPath,
            defaultValue,
          }}
        />,
        <NumberField
          key={`${groupPath.join('.')}.widthConstraint.maximum`}
          {...{
            label: 'Width Constraint Maximum',
            value,
            onChange,
            path: groupsWidthConstraintMaximumPath,
            defaultValue,
          }}
        />,
      ]}
      <SwitchField
        key={`${groupPath.join('.')}.heightConstrain`}
        {...{
          label: 'Height Constraint',
          value,
          onChange,
          path: groupsHeightConstraintPath,
          defaultValue,
        }}
      />
      {pathValue(groupsHeightConstraintPath) && [
        <NumberField
          key={`${groupPath.join('.')}.heightConstraint.minimum`}
          {...{
            label: 'Height Constraint Minimum',
            value,
            onChange,
            path: groupsHeightConstraintMinimumPath,
            defaultValue,
          }}
        />,
        <SelectField
          key={`${groupPath.join('.')}.heightConstraint.valign`}
          {...{
            options: valignOptions,
            label: 'Height Constraint Valign',
            value,
            onChange,
            path: groupsHeightConstraintValignPath,
            defaultValue,
          }}
        />,
      ]}
    </div>
  );
};
