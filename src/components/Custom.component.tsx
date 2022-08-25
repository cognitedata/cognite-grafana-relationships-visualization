import React from 'react';
import { InputField } from './Fields';
import { onChangeValue } from './utils';

export const CustomEditor: React.FC<any> = ({ value, onChange }) => {
  return (
    <InputField
      key={`externalId`}
      {...{
        value,
        onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
        label: 'Root ExternalId',
        path: ['externalId'],
      }}
    />
  );
};
