import React, { useMemo } from 'react';
import { ColorField, CustomField, SelectField, SliderField, SwitchField } from './Fields';
import { getDefaultValue, onChangeValue, smoothOptions, forceDirectionOptions, typeOptins } from './utils';

export const EdgesEditor: React.FC<any> = ({ onChange, value, item: { defaultValue } }) => {
  const fixedProps = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value: useMemo(() => {
      if (!value) {
        onChange(defaultValue);
        return defaultValue;
      }
      return value;
    }, [value]),
  };
  const pathValue = (path: string[]) => getDefaultValue(value, path);
  // console.log(pathValue(['smooth', 'forceDirection']));
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
      <SwitchField
        key="smooth"
        {...{
          label: 'Smooth',
          path: ['smooth', 'enabled'],
          ...fixedProps,
        }}
      />
      {pathValue(['smooth', 'enabled']) && [
        <SelectField
          key={'smooth.type'}
          {...{
            options: smoothOptions,
            label: 'Type',
            path: ['smooth', 'type'],
            ...fixedProps,
          }}
        />,
        pathValue(['smooth', 'type']) !== 'dynamic' && (
          <SliderField
            key="smooth.roundness"
            {...{
              label: 'Roundness',
              path: ['smooth', 'roundness'],
              min: 0.0,
              max: 1.0,
              step: 0.1,
              ...fixedProps,
            }}
          />
        ),
        pathValue(['smooth', 'type']) === 'cubicBezier' && (
          <SelectField
            key={'smooth.forceDirection'}
            {...{
              options: forceDirectionOptions,
              label: 'Force Direction',
              path: ['smooth', 'forceDirection'],
              ...fixedProps,
            }}
          />
        ),
      ]}
      <SwitchField
        key="edges.arrows.to.enabled"
        {...{
          label: 'enabled to arrows',
          path: ['arrows', 'to', 'enabled'],
          ...fixedProps,
        }}
      />
      {pathValue(['arrows', 'to', 'enabled']) && (
        <SelectField
          key="edges.arrows.to.type"
          {...{
            options: typeOptins,
            label: 'to arrows type',
            path: ['arrows', 'to', 'type'],
            ...fixedProps,
          }}
        />
      )}
      <SwitchField
        key="edges.arrows.middle.enabled"
        {...{
          label: 'enabled middle arrows',
          path: ['arrows', 'middle', 'enabled'],
          ...fixedProps,
        }}
      />
      <SwitchField
        key="edges.arrows.from.enabled"
        {...{
          label: 'enabled from arrows',
          path: ['arrows', 'from', 'enabled'],
          ...fixedProps,
        }}
      />
    </div>
  );
};
