import React from 'react';
import { SelectedValue } from '../types';
import { EDGES, NODES, shapeOptions, sizableList, tabLabel } from '../utils';
import { ColorField } from './ColorField';
import { ColorFields } from './ColorFields';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';

export const Nodes: React.FC<any> = ({ onChange, setPathValue, pathValue, groupsAvoidTabPathValue }) => {
  const groupPath =
    groupsAvoidTabPathValue === EDGES
      ? []
      : groupsAvoidTabPathValue === NODES
      ? [groupsAvoidTabPathValue]
      : ['groups', groupsAvoidTabPathValue];

  const groupsShapePath = [...groupPath, 'shape'];
  const groupsColorBackgroundPath = [...groupPath, 'color', 'background'];
  const groupsColorBorderPath = [...groupPath, 'color', 'border'];
  const groupsFontColorPath = [...groupPath, 'font', 'color'];
  const groupsSizePath = [...groupPath, 'size'];

  const groupsShapePathValue = pathValue(groupsShapePath);
  const groupsColorBackgroundPathValue = pathValue(groupsColorBackgroundPath);
  const groupsColorBorderPathValue = pathValue(groupsColorBorderPath);
  const groupsFontColorPathValue = pathValue(groupsFontColorPath);
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
              onChange: (colorValue: string) => onChange(setPathValue(colorValue, groupsColorBackgroundPath)),
              color: groupsColorBackgroundPathValue,
              width: '33%',
            }}
          />
          <ColorField
            key={'groups.color.border'}
            {...{
              label: 'Border',
              onChange: (colorValue: string) => onChange(setPathValue(colorValue, groupsColorBorderPath)),
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
              onChange: (colorValue: string) => onChange(setPathValue(colorValue, groupsFontColorPath)),
            }}
          />
        </div>
      )}
      <SelectField
        key={'groups.shape'}
        {...{
          options: shapeOptions,
          onChange: (selectedValue: SelectedValue) => onChange(setPathValue(selectedValue.id, groupsShapePath)),
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
            onChange: (selectedValue: number) => onChange(setPathValue(selectedValue, groupsSizePath)),
            min: 10,
            max: 100,
          }}
        />
      )}
    </div>
  );
};
