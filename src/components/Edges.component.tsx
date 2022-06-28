import React from 'react';
import { ColorField, CustomField, SliderField, SwitchField } from './Fields';

export const Edges: React.FC<any> = ({ onChange, value, parent, label }) => {
  const fixedProps = {
    onChange,
    value,
    parent,
    selector: label,
  };
  return (
    <div key={parent}>
      {CustomField('Colors')}
      <div className="holder">
        <ColorField
          {...{
            label: 'Background',
            path: ['color', 'color'],
            width: '50%',
            ...fixedProps,
          }}
        />
        <ColorField
          key="edges.font.color"
          {...{
            label: 'Font',
            path: ['font', 'color'],
            width: '50%',
            ...fixedProps,
          }}
        />
      </div>
      <SliderField
        key="edges.length"
        {...{
          label: 'Length',
          path: ['length'],
          min: 10,
          max: 1000,
          ...fixedProps,
        }}
      />
      <SwitchField
        key="edges.dashes"
        {...{
          label: 'Dashes',
          path: ['dashes'],
          ...fixedProps,
        }}
      />
    </div>
  );
};
