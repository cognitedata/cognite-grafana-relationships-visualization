import React from 'react';
import { EXTRA_KEY } from '../constants';
import { InputField } from './Fields';

export const CustomEditor: React.FC<any> = ({ value, onChange, item: { defaultValue } }) => {
  const rootExternalIdPath = ['rootId'];

  return (
    <div>
      <InputField
        key={`${EXTRA_KEY}.externalId`}
        {...{
          value,
          onChange,
          label: 'Root ExternalId',
          path: rootExternalIdPath,
          defaultValue,
        }}
      />
    </div>
  );
};
