import React from 'react';
import { Field, Select } from '@grafana/ui';
import _ from 'lodash';
import { PanelEditorProps } from '../types';
import { shapeOptions } from '../constants';

export const ShapeSelect: React.FC<PanelEditorProps> = ({ onChange, settings }) => {
  const {
    nodes: { shape },
  } = settings;
  return (
    <Field label={'Select Shape'}>
      <Select
        value={_.find(shapeOptions, { id: shape })}
        options={shapeOptions}
        onChange={(selectableValue) =>
          onChange({
            ...settings,
            nodes: {
              ...settings.nodes,
              shape: selectableValue.id,
            },
          })
        }
      />
    </Field>
  );
};
