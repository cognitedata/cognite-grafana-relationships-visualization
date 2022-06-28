import React from 'react';
import { ColorField, ColorFields, NumberField, SelectField, SliderField, SwitchField } from './Fields';
import { AVOIDABLE_ENABLED, sizableList } from '../constants';
import { getValue, shapeOptions, valignOptions } from './utils';

// oslo_production_mix_tank

export const Nodes: React.FC<any> = ({ onChange, value, label, parent }) => {
  const pathValue = (path: string[]) => getValue(value, [...parent, label, ...path]);

  const fixedProps = {
    onChange,
    value,
    parent,
    selector: label,
  };
  const style = { padding: 8 };
  return (
    <div style={style} key={parent}>
      {ColorFields(
        <div className="holder">
          <ColorField
            key={'color.background'}
            {...{
              label: 'Background',
              path: ['color', 'background'],
              width: '33%',
              ...fixedProps,
            }}
          />
          <ColorField
            key={'color.border'}
            {...{
              label: 'Border',
              path: ['color', 'border'],
              width: '33%',
              ...fixedProps,
            }}
          />
          <ColorField
            key={'font.color'}
            {...{
              label: 'Font',
              path: ['font', 'color'],
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
          path: ['shape'],
          ...fixedProps,
        }}
      />
      {sizableList.includes(pathValue(['shape'])) && (
        <SliderField
          key={'size'}
          {...{
            label: 'Size',
            path: ['size'],
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
          path: ['widthConstraint', AVOIDABLE_ENABLED],
          ...fixedProps,
        }}
      />
      {pathValue(['widthConstraint', AVOIDABLE_ENABLED]) && [
        <NumberField
          key={`${parent}.widthConstraint.minimum`}
          {...{
            label: 'Width Constraint Minimum',
            path: ['widthConstraint', 'minimum'],
            ...fixedProps,
          }}
        />,
        <NumberField
          key={`${parent}.widthConstraint.maximum`}
          {...{
            label: 'Width Constraint Maximum',
            path: ['widthConstraint', 'maximum'],
            ...fixedProps,
          }}
        />,
      ]}
      <SwitchField
        key={`${parent}.heightConstrain`}
        {...{
          label: 'Height Constraint',
          path: ['heightConstrain', AVOIDABLE_ENABLED],
          ...fixedProps,
        }}
      />
      {pathValue(['heightConstrain', AVOIDABLE_ENABLED]) && [
        <NumberField
          key={`${parent}.heightConstraint.minimum`}
          {...{
            label: 'Height Constraint Minimum',
            path: ['heightConstraint', 'minimum'],
            ...fixedProps,
          }}
        />,
        <SelectField
          key={`${parent}.heightConstraint.valign`}
          {...{
            options: valignOptions,
            label: 'Height Constraint Valign',
            path: ['heightConstraint', 'valign'],
            ...fixedProps,
          }}
        />,
      ]}
    </div>
  );
};
