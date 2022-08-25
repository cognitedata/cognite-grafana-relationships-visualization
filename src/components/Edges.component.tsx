import React, { useMemo } from 'react';
import { ColorField, CustomField, SelectField, SliderField, SwitchField } from './Fields';
import { getDefaultValue, onChangeValue, smoothOptions, forceDirectionOptions, useThemeSelector } from './utils';
import { defaultGraphValue, EDGES } from '../constants';

export const EdgesEditor: React.FC<any> = ({ onChange, value }) => {
  // @ts-ignore
  const version = parseInt(window.grafanaBootData.settings.buildInfo.version.split('.')[0]) > 7;
  const defaultValue = getDefaultValue(defaultGraphValue, [EDGES]);
  const newValue = useMemo(() => {
    if (!value) {
      if (!version) {
        onChange(defaultValue);
        return defaultValue;
      } else {
        const { isDark } = useThemeSelector();
        if (isDark) {
          defaultValue.color.color = '#ffffff';
          defaultValue.font.color = '#ffffff';
          onChange(defaultValue);
          return defaultValue;
        }
        onChange(defaultValue);
        return defaultValue;
      }
    }
    return value;
  }, [value]);
  const fixedProps = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value: newValue,
  };
  const pathValue = (path: string[]) => getDefaultValue(value, path);
  //console.log(newValue, value);
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
    </div>
  );
};
