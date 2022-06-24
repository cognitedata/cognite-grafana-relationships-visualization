import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { EXTRA_KEY } from '../utils';
import { DefaultOptions } from '../types';
import { InputField } from './Fields';

export const CustomEditor: React.FC<StandardEditorProps<DefaultOptions>> = ({ value, onChange }) => {
  const rootExternalIdPath = [EXTRA_KEY, 'rootId'];

  return (
    <div>
      <InputField
        key={`${EXTRA_KEY}.externalId`}
        {...{
          value,
          onChange,
          label: 'Root ExternalId',
          path: rootExternalIdPath,
        }}
      />
    </div>
  );
};
