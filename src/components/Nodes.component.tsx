import React from 'react';
import { ColorField, ColorFields, NumberField, SelectField, SliderField, SwitchField } from './Fields';
import { AVOIDABLE_ENABLED, sizableList } from '../constants';
import { getDefaultValue, shapeOptions, valignOptions } from './utils';

// oslo_production_mix_tank

export const Nodes: React.FC<any> = ({ onChange, value, label }) => {
  const pathValue = (path: string[]) => getDefaultValue(value, path);
  const fixedProps = {
    onChange,
    value,
  };
  const style = { padding: 8 };
  return (
    <div style={style} key={label}>
      {ColorFields(
        <div className="holder">
          <ColorField
            key={'color.background'}
            {...{
              label: 'Background',
              path: [label, 'color', 'background'],
              width: '33%',
              ...fixedProps,
            }}
          />
          <ColorField
            key={'color.border'}
            {...{
              label: 'Border',
              path: [label, 'color', 'border'],
              width: '33%',
              ...fixedProps,
            }}
          />
          <ColorField
            key={'font.color'}
            {...{
              label: 'Font',
              path: [label, 'font', 'color'],
              width: '33%',
              ...fixedProps,
            }}
          />
        </div>
      )}
      <SelectField
        key={'shape'}
        {...{
          options: shapeOptions,
          label: 'Shape',
          path: [label, 'shape'],
          ...fixedProps,
        }}
      />
      {sizableList.includes(pathValue([label, 'shape'])) && (
        <SliderField
          key={'size'}
          {...{
            label: 'Size',
            path: [label, 'size'],
            min: 10,
            max: 100,
            ...fixedProps,
          }}
        />
      )}
      <SwitchField
        key={`${parent}.widthConstraint`}
        {...{
          label: 'Width Constraint',
          path: [label, 'widthConstraint', AVOIDABLE_ENABLED],
          ...fixedProps,
        }}
      />
      {pathValue([label, 'widthConstraint', AVOIDABLE_ENABLED]) && [
        <NumberField
          key={`${parent}.widthConstraint.minimum`}
          {...{
            label: 'Width Constraint Minimum',
            path: [label, 'widthConstraint', 'minimum'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`${parent}.widthConstraint.maximum`}
          {...{
            label: 'Width Constraint Maximum',
            path: [label, 'widthConstraint', 'maximum'],
            ...fixedProps,
          }}
        />,
      ]}
      <SwitchField
        key={`${parent}.heightConstraint`}
        {...{
          label: 'Height Constraint',
          path: [label, 'heightConstraint', AVOIDABLE_ENABLED],
          ...fixedProps,
        }}
      />
      {pathValue([label, 'heightConstraint', AVOIDABLE_ENABLED]) && [
        <NumberField
          key={`${parent}.heightConstraint.minimum`}
          {...{
            label: 'Height Constraint Minimum',
            path: [label, 'heightConstraint', 'minimum'],
            ...fixedProps,
          }}
        />,
        <SelectField
          key={`${parent}.heightConstraint.valign`}
          {...{
            options: valignOptions,
            label: 'Height Constraint Valign',
            path: [label, 'heightConstraint', 'valign'],
            ...fixedProps,
          }}
        />,
      ]}
    </div>
  );
};
