import React, { useEffect } from 'react';
import { InputField } from './Fields';
import { onChangeValue } from './utils';

export const CustomEditor: React.FC<any> = ({ value, onChange, item: { defaultValue } }) => {
  useEffect(() => {
    if (!value) {
      return onChange(defaultValue);
    }
  }, [value]);
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
