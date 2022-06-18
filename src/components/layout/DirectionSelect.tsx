import React from 'react';
import { Field, Select } from '@grafana/ui';
import _ from 'lodash';
import { PanelEditorProps } from '../types';
import { directions } from '../constants';

export const DirectionSelect: React.FC<PanelEditorProps> = ({ onChange, settings }) => {
  const {
    layout: {
      hierarchical: { direction },
    },
  } = settings;
  return (
    <Field label={'Choose Direction'}>
      <Select
        options={_.map(directions, (label, id) => ({ id, label }))}
        value={{ id: direction, label: directions[direction] }}
        onChange={(selectableValue) =>
          onChange({
            ...settings,
            layout: {
              ...settings.layout,
              hierarchical: {
                ...settings.layout.hierarchical,
                direction: selectableValue.id,
              },
            },
          })
        }
      />
    </Field>
  );
};
