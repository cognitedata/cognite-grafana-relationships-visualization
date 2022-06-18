/* import React from 'react';
import { Field, Switch } from '@grafana/ui';
import { PanelEditorProps } from '../types';

export const EnableHierarchicalSwitch: React.FC<PanelEditorProps> = ({ onChange, settings }) => {
  const {
    layout: {
      hierarchical: { enabled },
    },
  } = settings;
  return (
    <Field label={'Enable'}>
      <Switch
        value={enabled}
        onChange={() => {
          return onChange({
            ...settings,
            layout: {
              ...settings.layout,
              hierarchical: {
                ...settings.layout.hierarchical,
                enabled: !enabled,
              },
            },
          });
        }}
      />
    </Field>
  );
};
 */