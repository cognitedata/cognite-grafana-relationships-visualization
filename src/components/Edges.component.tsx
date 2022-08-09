import React, { useMemo } from 'react';
import { ColorField, CustomField, SliderField, SwitchField } from './Fields';
import { onChangeValue } from './utils';

export const EdgesEditor: React.FC<any> = ({ onChange, value, item: { defaultValue } }) => {
  const fixedProps = {
    onChange: (newValue: any, path: any) => {
      return onChange(onChangeValue(path, newValue, value));
    },
    value: useMemo(() => {
      if (!value) {
        onChange(defaultValue);
        return defaultValue;
      }
      return value;
    }, [value]),
  };
  return (
    <div>
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
